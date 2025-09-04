// src/pages/Library.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Library.css';

const Library = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('playlists');
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [followedArtists, setFollowedArtists] = useState([]);
  const [savedAlbums, setSavedAlbums] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);

  // Datos de ejemplo (simulando una API)
  useEffect(() => {
    // Simular carga de datos
    const loadLibraryData = () => {
      // Playlists del usuario
      setUserPlaylists([
        {
          id: 1,
          name: "Mis Favoritos",
          description: "Tus canciones favoritas",
          image: "https://via.placeholder.com/200",
          songs: 24
        },
        {
          id: 2,
          name: "Para Estudiar",
          description: "Música para concentrarse",
          image: "https://via.placeholder.com/200",
          songs: 18
        },
        {
          id: 3,
          name: "Éxitos 2023",
          description: "Lo mejor del año",
          image: "https://via.placeholder.com/200",
          songs: 35
        }
      ]);

      // Artistas seguidos
      setFollowedArtists([
        {
          id: 1,
          name: "The Weeknd",
          image: "https://via.placeholder.com/200",
          followers: "35M"
        },
        {
          id: 2,
          name: "Dua Lipa",
          image: "https://via.placeholder.com/200",
          followers: "28M"
        },
        {
          id: 3,
          name: "Bad Bunny",
          image: "https://via.placeholder.com/200",
          followers: "42M"
        }
      ]);

      // Álbumes guardados
      setSavedAlbums([
        {
          id: 1,
          title: "After Hours",
          artist: "The Weeknd",
          image: "https://via.placeholder.com/200",
          year: "2020"
        },
        {
          id: 2,
          title: "Future Nostalgia",
          artist: "Dua Lipa",
          image: "https://via.placeholder.com/200",
          year: "2020"
        },
        {
          id: 3,
          title: "Un Verano Sin Ti",
          artist: "Bad Bunny",
          image: "https://via.placeholder.com/200",
          year: "2022"
        }
      ]);

      // Canciones gustadas
      setLikedSongs([
        {
          id: 1,
          title: "Blinding Lights",
          artist: "The Weeknd",
          album: "After Hours",
          duration: "3:20",
          image: "https://via.placeholder.com/80"
        },
        {
          id: 2,
          title: "Don't Start Now",
          artist: "Dua Lipa",
          album: "Future Nostalgia",
          duration: "3:03",
          image: "https://via.placeholder.com/80"
        },
        {
          id: 3,
          title: "Tití Me Preguntó",
          artist: "Bad Bunny",
          album: "Un Verano Sin Ti",
          duration: "4:03",
          image: "https://via.placeholder.com/80"
        }
      ]);
    };

    loadLibraryData();
  }, []);

  const renderPlaylists = () => (
    <div className="library-grid">
      {userPlaylists.map(playlist => (
        <div key={playlist.id} className="library-item">
          <div className="library-item-image">
            <img src={playlist.image} alt={playlist.name} />
            <button className="play-button">▶</button>
          </div>
          <h4>{playlist.name}</h4>
          <p>{playlist.description}</p>
          <span className="item-count">{playlist.songs} canciones</span>
        </div>
      ))}
    </div>
  );

  const renderArtists = () => (
    <div className="library-grid">
      {followedArtists.map(artist => (
        <div key={artist.id} className="library-item">
          <div className="library-item-image circle">
            <img src={artist.image} alt={artist.name} />
          </div>
          <h4>{artist.name}</h4>
          <p>{artist.followers} seguidores</p>
          <button className="follow-button">Siguiendo</button>
        </div>
      ))}
    </div>
  );

  const renderAlbums = () => (
    <div className="library-grid">
      {savedAlbums.map(album => (
        <div key={album.id} className="library-item">
          <div className="library-item-image">
            <img src={album.image} alt={album.title} />
            <button className="play-button">▶</button>
          </div>
          <h4>{album.title}</h4>
          <p>{album.artist}</p>
          <span className="item-year">{album.year}</span>
        </div>
      ))}
    </div>
  );

  const renderSongs = () => (
    <div className="songs-list">
      <div className="songs-header">
        <span>#</span>
        <span>Título</span>
        <span>Álbum</span>
        <span>Duración</span>
      </div>
      {likedSongs.map((song, index) => (
        <div key={song.id} className="song-row">
          <span className="song-number">{index + 1}</span>
          <div className="song-info">
            <img src={song.image} alt={song.title} />
            <div>
              <h4>{song.title}</h4>
              <p>{song.artist}</p>
            </div>
          </div>
          <span className="song-album">{song.album}</span>
          <span className="song-duration">{song.duration}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="library-page">
      <div className="library-header">
        <h1>Tu Biblioteca</h1>
        <div className="search-library">
          <input type="text" placeholder="Buscar en tu biblioteca..." />
        </div>
      </div>

      <div className="library-tabs">
        <button 
          className={activeTab === 'playlists' ? 'active' : ''} 
          onClick={() => setActiveTab('playlists')}
        >
          Playlists
        </button>
        <button 
          className={activeTab === 'artists' ? 'active' : ''} 
          onClick={() => setActiveTab('artists')}
        >
          Artistas
        </button>
        <button 
          className={activeTab === 'albums' ? 'active' : ''} 
          onClick={() => setActiveTab('albums')}
        >
          Álbumes
        </button>
        <button 
          className={activeTab === 'songs' ? 'active' : ''} 
          onClick={() => setActiveTab('songs')}
        >
          Canciones
        </button>
      </div>

      <div className="library-content">
        {activeTab === 'playlists' && renderPlaylists()}
        {activeTab === 'artists' && renderArtists()}
        {activeTab === 'albums' && renderAlbums()}
        {activeTab === 'songs' && renderSongs()}
      </div>

      {userPlaylists.length === 0 && activeTab === 'playlists' && (
        <div className="empty-state">
          <h3>Aún no tienes playlists</h3>
          <p>Crea tu primera playlist y descubre música nueva</p>
          <button className="create-button">Crear playlist</button>
        </div>
      )}
    </div>
  );
};

export default Library;