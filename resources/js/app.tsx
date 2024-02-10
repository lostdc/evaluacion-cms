// app.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import Register from './components/Register'; // Asegúrate de que la ruta sea correcta


const rootElement = document.getElementById('example-component');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<Register />);
}