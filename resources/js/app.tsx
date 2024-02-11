// app.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import Register from './components/Register'; // Importa el componente de registro
import Login from './components/Login'; // Importa el componente de login

// Intenta renderizar el componente de registro
const registerElement = document.getElementById('example-component');
if (registerElement) {
    const root = ReactDOM.createRoot(registerElement);
    root.render(<Register />);
}

// Intenta renderizar el componente de login
const loginElement = document.getElementById('login');
if (loginElement) {
    const root = ReactDOM.createRoot(loginElement);
    root.render(<Login />);
}
