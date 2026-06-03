import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root');

if (!container) {
  console.error("Critical Failure: Root element '#root' not found. Creating fallback...");
  const fallback = document.createElement('div');
  fallback.id = 'root';
  document.body.prepend(fallback);
  createRoot(fallback).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
