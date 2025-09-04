// src/App.jsx - Verifica que las importaciones sean exactamente así:
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';

import Login from './pages/Login';    // Sin extensión .jsx
import Home from './pages/Home';      // Sin extensión .jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';

// En tu App.jsx
import Library from './pages/Library';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/library" element={<Library />} /> 
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App