// src/pages/Search.jsx
import React, { useState } from 'react';
import useDeezer from '../hooks/useDeezer';
import { searchDeezer } from '../services/deezerApi';
import './styles/Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  
  const { data, loading, error } = useDeezer(
    () => {
      if (!query) return Promise.resolve({ data: [] });
      
      switch (searchType) {
        case 'tracks':
          return searchDeezer.tracks(query);
        case 'artists':
          return searchDeezer.artists(query);
        case 'albums':
          return searchDeezer.albums(query);
        case 'playlists':
          return searchDeezer.playlists(query);
        default:
          return searchDeezer.all(query);
      }
    },
    [query, searchType]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // La búsqueda se ejecuta automáticamente por el hook
    }
  };

  const renderResults = () => {
    if (!data) return null;
    
    const results = data.data || [];
    
    if (results.length === 0) {
      return <div className="no-results">No se encontraron resultados</div>;
    }

    switch (searchType) {
      case 'tracks':
        return (
          <div className="results-grid">
            {results.map(track => (
              <div key={track.id} className="result-card">
                <img src={track.album.cover_medium} alt={track.title} />
                <h4>{track.title}</h4>
                <p>{track.artist.name}</p>
                <span>{track.duration} segundos</span>
              </div>
            ))}
          </div>
        );
      
      case 'artists':
        return (
          <div className="results-grid">
            {results.map(artist => (
              <div key={artist.id} className="result-card">
                <img src={artist.picture_medium} alt={artist.name} />
                <h4>{artist.name}</h4>
                <p>{artist.nb_fan} fans</p>
              </div>
            ))}
          </div>
        );
      
      case 'albums':
        return (
          <div className="results-grid">
            {results.map(album => (
              <div key={album.id} className="result-card">
                <img src={album.cover_medium} alt={album.title} />
                <h4>{album.title}</h4>
                <p>{album.artist.name}</p>
                <span>{album.release_date}</span>
              </div>
            ))}
          </div>
        );
      
      case 'playlists':
        return (
          <div className="results-grid">
            {results.map(playlist => (
              <div key={playlist.id} className="result-card">
                <img src={playlist.picture_medium} alt={playlist.title} />
                <h4>{playlist.title}</h4>
                <p>{playlist.nb_tracks} canciones</p>
                <span>Por {playlist.creator.name}</span>
              </div>
            ))}
          </div>
        );
      
      default:
        return (
          <div className="results-grid">
            {results.map(item => (
              <div key={item.id} className="result-card">
                <img 
                  src={item.album?.cover_medium || item.picture_medium || item.cover_medium} 
                  alt={item.title} 
                />
                <h4>{item.title}</h4>
                <p>{item.artist?.name || item.creator?.name}</p>
                <span>{item.type}</span>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Buscar Música</h1>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Artistas, canciones, álbumes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">🔍</button>
          </div>
          
          <div className="search-filters">
            <label>
              <input
                type="radio"
                value="all"
                checked={searchType === 'all'}
                onChange={() => setSearchType('all')}
              />
              Todo
            </label>
            <label>
              <input
                type="radio"
                value="tracks"
                checked={searchType === 'tracks'}
                onChange={() => setSearchType('tracks')}
              />
              Canciones
            </label>
            <label>
              <input
                type="radio"
                value="artists"
                checked={searchType === 'artists'}
                onChange={() => setSearchType('artists')}
              />
              Artistas
            </label>
            <label>
              <input
                type="radio"
                value="albums"
                checked={searchType === 'albums'}
                onChange={() => setSearchType('albums')}
              />
              Álbumes
            </label>
            <label>
              <input
                type="radio"
                value="playlists"
                checked={searchType === 'playlists'}
                onChange={() => setSearchType('playlists')}
              />
              Playlists
            </label>
          </div>
        </form>
      </div>

      <div className="search-results">
        {loading && <div className="loading">Buscando...</div>}
        {error && <div className="error">Error: {error}</div>}
        {renderResults()}
      </div>
    </div>
  );
};

export default Search;