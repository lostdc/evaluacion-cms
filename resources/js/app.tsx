import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login'; 
import Register from './components/Register';
import Home from './components/Home'; 
import Category from './components/categories'; 
import BaseLayout from './components/BaseLayout';
import PostDetail from './components/PostDetail';
import GlobalStyle from './components/styles/GlobalStyles'
import './helpers/notificationService'
import ErrorModal from './helpers/ErrorModal';


const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
      // Función para verificar la autenticación del usuario
      const checkAuthStatus = () => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Establecer isAuthenticated como verdadero si hay un token presente en el LocalStorage
      };
      checkAuthStatus();

      const handleError = (event: CustomEvent) => {
        setErrorMessage(event.detail.message);
        setShowErrorModal(true);
      };
  
      window.addEventListener('show-error', handleError as EventListener);
  
      return () => {
        window.removeEventListener('show-error', handleError as EventListener);
      };



  }, []);
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ErrorModal
        showError={showErrorModal}
        errorMessage={errorMessage}
        handleClose={() => setShowErrorModal(false)}
      />
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/Category" element={isAuthenticated ? <Category /> : <Navigate to="/home" />} />
        {/* Ruta para PostDetail */}
        <Route path="/post/:id" element={<BaseLayout><PostDetail /></BaseLayout>} />

      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
