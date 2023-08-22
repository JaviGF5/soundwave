import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './utils/firebase';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // ELIMINAR - COMENTAR  React.StrictMode PARA EVITAR DOBLE RENDERIZADO
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);


reportWebVitals();
