// src/components/Header.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css'; // Archivo de estilos para el Header

const Header = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        {/* Logo y navegación */}
        <div className="logo">
          <h1>Kodigo Music</h1>
        </div>
      </div>
      
      <div className="header-right">
        {currentUser ? (
          
          <div className="user-menu">
            <nav className="navigation">
              <a href="/">Inicio</a>
              <a href="/search">Buscar</a>
              <a href="/library">Mi Biblioteca</a>
            </nav>
            <span className="user-greeting">Hola, {currentUser.email}</span>
            <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        ) : (
          <a href="/login" className="login-link">Iniciar sesión</a>
        )}
      </div>
    </header>
  );
};

export default Header;