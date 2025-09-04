// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Kodigo</h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <span className="icon">🏠</span>
              <span>Inicio</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <span className="icon">🔍</span>
              <span>Buscar</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/library" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <span className="icon">📚</span>
              <span>Tu Biblioteca</span>
            </NavLink>
          </li>
        </ul>
        
        <div className="sidebar-playlists">
          <h3>Playlists</h3>
          <ul>
            <li><a href="#">Lista de Favoritos</a></li>
            <li><a href="#">Música para estudiar</a></li>
            <li><a href="#">Éxitos 2023</a></li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;