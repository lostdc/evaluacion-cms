import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login'; 
import Register from './components/Register';
import Home from './components/Home'; 
import Category from './components/categories'; 

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      // Función para verificar la autenticación del usuario
      const checkAuthStatus = () => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Establecer isAuthenticated como verdadero si hay un token presente en el LocalStorage
      };
  
      checkAuthStatus();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/Category" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
