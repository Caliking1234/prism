/// <reference types="vitest" />
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Dev only: serves POST /api/contact from api/contact.js (the same code Vercel runs),
 * so plain `npm run dev` can send real test emails. Server-side settings come from `.env`.
 */
function contactApiDev(): Plugin {
  return {
    name: 'contact-api-dev',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '');
      for (const [k, v] of Object.entries(env)) if (!k.startsWith('VITE_') && process.env[k] === undefined) process.env[k] = v;

      server.middlewares.use('/api/contact', async (req, res) => {
        try {
          const chunks: Buffer[] = [];
          for await (const c of req) chunks.push(c as Buffer);
          const headers = new Headers();
          for (const [k, v] of Object.entries(req.headers)) if (typeof v === 'string') headers.set(k, v);
          if (!headers.has('x-real-ip') && req.socket.remoteAddress) headers.set('x-real-ip', req.socket.remoteAddress);
          const method = req.method || 'GET';
          const request = new Request(`http://${req.headers.host}/api/contact`, {
            method, headers, body: method === 'GET' || method === 'HEAD' ? undefined : Buffer.concat(chunks)
          });
          const mod = await import(/* @vite-ignore */ pathToFileURL(resolve('api/contact.js')).href);
          const response: Response = await (mod[method] || mod.POST)(request);
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(await response.text());
        } catch (err) {
          server.config.logger.error(`[contact-api-dev] ${(err as Error).stack || err}`);
          res.statusCode = 500;
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: 'Local contact API crashed — see the terminal.' }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), contactApiDev()],
  test: { environment: 'node' }
});
