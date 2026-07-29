/**
 * @file main.jsx
 * @description The primary entry point for the React application.
 * Initializes the React DOM and mounts the top-level App component into the browser.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import global stylesheet (including CSS variables and framework resets)
import './index.css';

// Import the root orchestrator component
import App from './App.jsx';

/**
 * Initialize the React 18 Concurrent DOM Root.
 * This physically connects our React code to the empty <div id="root"></div> 
 * located inside the public/index.html file.
 */
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

/**
 * Render the application tree to the DOM.
 * 
 * Note: <StrictMode> intentionally double-invokes components during development 
 * to help catch bugs, unsafe lifecycles, and legacy API usage. It does not 
 * affect production builds.
 */
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);