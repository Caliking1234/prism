import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/pages.css';

// Scroll reveals only switch on when motion is allowed and supported; otherwise content is visible from the start.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce && 'IntersectionObserver' in window) document.documentElement.classList.add('reveal-ready');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
