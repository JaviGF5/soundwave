import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './utils/firebase';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // WARNING - <React.StrictMode> for development only, double rendering.
  /* 
  <React.StrictMode>
      <App />
  </React.StrictMode> 
  */

  <App />

);

reportWebVitals();
