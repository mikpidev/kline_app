// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { getDeezerCharts } from '../services/deezerApi';
import '../styles/Home.css';

const Home = () => {
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const data = await getDeezerCharts.tracks(12);
        console.log('Charts recibidos del backend:', data); // <-- aquí
        setCharts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCharts();
  }, []);
  
  const genres = [
    { id: 132, name: 'Pop', color: '#8E44AD', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="40" height="40" viewBox="0 0 24 24"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg>
    )},
    { id: 116, name: 'Rap/Hip Hop', color: '#E74C3C', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="40" height="40" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 15H9v-2h2Zm0-4H9V7h2Zm6 4h-2v-2h2Zm0-4h-2V7h2Z"/></svg>
    )},
    { id: 152, name: 'Rock', color: '#34495E', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="40" height="40" viewBox="0 0 24 24"><path d="M16 2v2h-2V2h-4v2H8V2H6v6h12V2h-2Zm-6 8v12h4V10h-4Z"/></svg>
    )},
    { id: 113, name: 'Dance', color: '#F39C12', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="40" height="40" viewBox="0 0 24 24"><path d="M12 4a4 4 0 1 0 4 4h4a8 8 0 1 1-8-8v4Z"/></svg>
    )},
    { id: 165, name: 'R&B', color: '#2980B9', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="40" height="40" viewBox="0 0 24 24"><path d="M5 3v18h6a6 6 0 0 0 0-12H7V3H5Zm6 10a4 4 0 0 1 0 8H7v-8h4Z"/></svg>
    )},
    { id: 85, name: 'Latino', color: '#27AE60', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="40" height="40" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0 0 20v-2a8 8 0 1 1 8-8h2A10 10 0 0 0 12 2Z"/></svg>
    )}
  ];

  const handlePlay = (track) => {
    // Puedes agregar tu lógica de reproducción aquí
    console.log('Reproducir track:', track.title);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Bienvenido a Kodigo Music</h1>
      </div>

      {/* Trending Mundial */}
      <section className="featured-section">
        <h2>Trending Mundial</h2>
        {loading && <div className="loading">Cargando...</div>}
        {error && <div className="error">Error: {error}</div>}

        {charts?.data && (
          <div className="tracks-grid">
            {charts.data.slice(0, 12).map(track => (
              <div key={track.id} className="track-card">
                <div className="track-image">
                  <img 
                    src={track.album?.cover_medium || '/placeholder.png'} 
                    alt={track.title} 
                  />
                  <button className="play-btn" onClick={() => handlePlay(track)}>▶</button>
                </div>
                <div className="track-info">
                  <h4>{track.title}</h4>
                  <p>{track.artist?.name || 'Unknown Artist'}</p>
                  <span className="track-duration">
                    {Math.floor(track.duration / 60)}:
                    {(track.duration % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>

      {/* Géneros */}
      <section className="genres-section">
        <h2 className="genres-title">Explorar Géneros</h2>
        <div className="genres-grid">
          {genres.map(genre => (
            <div 
              key={genre.id} 
              className="genre-card"
              style={{ backgroundColor: genre.color }}
            >
              {genre.icon}
              <h3>{genre.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
