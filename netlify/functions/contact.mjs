import { handleContact } from '../../src/shared/contact-handler.js';

// Netlify Functions (v2). Secrets and recipients come from Netlify environment variables only.
export default async (req, context) => handleContact(req, { env: process.env, ip: context?.ip });

export const config = { path: '/api/contact' };
