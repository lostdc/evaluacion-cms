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
      const checkAuthStatus = async () => {
          try {
              const response = await fetch('/api/auth/check', {
                  method: 'GET',
                  credentials: 'include', // Importante para incluir cookies en la solicitud
              });
  
              if (response.ok) {
                  const data = await response.json();
                  setIsAuthenticated(data.isAuthenticated);
              } else {
                  setIsAuthenticated(false);
              }
          } catch (error) {
              console.error('Error al verificar el estado de autenticación', error);
              setIsAuthenticated(false);
          }
          //setIsLoading(false); // Indica que la verificación ha terminado
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
















//import React, { useEffect, useState } from 'react';
//import ReactDOM from 'react-dom/client';
//import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import Login from './components/Login'; // Asegúrate de que las rutas sean correctas
//import Register from './components/Register';
//import Home from './components/Home'; // Asume que tienes un componente Home para usuarios autenticados
//
//const App = () => {
//    const [isAuthenticated, setIsAuthenticated] = useState(false);
//
//    useEffect(() => {
//        // Aquí deberías implementar la lógica para verificar si el usuario está autenticado
//        // Por ejemplo, podrías hacer una petición a un endpoint de tu API que verifique la sesión
//        // Para este ejemplo, simplemente estableceremos isAuthenticated en true
//        setIsAuthenticated(false); // Ajusta esto según la lógica de tu aplicación
//    }, []);
//
//    return (
//        <BrowserRouter>
//            <Routes>
//                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
//                <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/home" />} />
//                <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
//                {/* Redirige a login si la ruta no coincide */}
//                <Route path="*" element={<Navigate to="/login" />} />
//            </Routes>
//        </BrowserRouter>
//    );
//};
//
//const rootElement = document.getElementById('react-root') || document.getElementById('login'); // Ajusta según tus IDs de Blade
//if (rootElement) {
//    const root = ReactDOM.createRoot(rootElement);
//    root.render(<App />);
//}
