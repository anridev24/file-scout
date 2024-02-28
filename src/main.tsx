import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import '@assets/css/custom-scrollbar.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
