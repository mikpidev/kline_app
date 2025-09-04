// server.js
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Función genérica para llamar a la API de Deezer
const fetchFromDeezer = async (endpoint) => {
  try {
    const response = await fetch(`https://api.deezer.com${endpoint}`);
    if (!response.ok) throw new Error(`Deezer API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// -----------------------------
// BÚSQUEDAS
// -----------------------------
app.get('/api/search', async (req, res) => {
  const { q, limit = 10 } = req.query;
  try {
    const data = await fetchFromDeezer(`/search?q=${encodeURIComponent(q)}&limit=${limit}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/search/track', async (req, res) => {
  const { q, limit = 10 } = req.query;
  try {
    const data = await fetchFromDeezer(`/search/track?q=${encodeURIComponent(q)}&limit=${limit}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/search/artist', async (req, res) => {
  const { q, limit = 10 } = req.query;
  try {
    const data = await fetchFromDeezer(`/search/artist?q=${encodeURIComponent(q)}&limit=${limit}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/search/album', async (req, res) => {
  const { q, limit = 10 } = req.query;
  try {
    const data = await fetchFromDeezer(`/search/album?q=${encodeURIComponent(q)}&limit=${limit}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/search/playlist', async (req, res) => {
  const { q, limit = 10 } = req.query;
  try {
    const data = await fetchFromDeezer(`/search/playlist?q=${encodeURIComponent(q)}&limit=${limit}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// CONTENIDO ESPECÍFICO
// -----------------------------
app.get('/api/track/:id', async (req, res) => {
  try {
    const data = await fetchFromDeezer(`/track/${req.params.id}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/album/:id', async (req, res) => {
  try {
    const data = await fetchFromDeezer(`/album/${req.params.id}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/artist/:id', async (req, res) => {
  try {
    const data = await fetchFromDeezer(`/artist/${req.params.id}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/playlist/:id', async (req, res) => {
  try {
    const data = await fetchFromDeezer(`/playlist/${req.params.id}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/artist/:id/top', async (req, res) => {
  const { limit = 10 } = req.query;
  try {
    const data = await fetchFromDeezer(`/artist/${req.params.id}/top?limit=${limit}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/album/:id/tracks', async (req, res) => {
  try {
    const data = await fetchFromDeezer(`/album/${req.params.id}/tracks`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/playlist/:id/tracks', async (req, res) => {
  try {
    const data = await fetchFromDeezer(`/playlist/${req.params.id}/tracks`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// CHARTS
// -----------------------------
app.get('/api/chart', async (req, res) => {
  try {
    const data = await fetchFromDeezer('/chart');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/chart/:type', async (req, res) => {
  const { type } = req.params; // tracks, albums, artists, playlists
  const { limit = 20 } = req.query;
  try {
    const typeMap = { tracks: 0, albums: 0, artists: 0, playlists: 0 };
    const idx = typeMap[type];
    if (idx === undefined) throw new Error('Invalid chart type');
    const data = await fetchFromDeezer(`/chart/${idx}/${type}?limit=${limit}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// GÉNEROS
// -----------------------------
app.get('/api/genre', async (req, res) => {
  try {
    const data = await fetchFromDeezer('/genre');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/genre/:id/artists', async (req, res) => {
  const { limit = 20 } = req.query;
  try {
    const data = await fetchFromDeezer(`/genre/${req.params.id}/artists?limit=${limit}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/genre/:id/albums', async (req, res) => {
  const { limit = 20 } = req.query;
  try {
    const data = await fetchFromDeezer(`/genre/${req.params.id}/albums?limit=${limit}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/genre/:id/playlists', async (req, res) => {
  const { limit = 20 } = req.query;
  try {
    const data = await fetchFromDeezer(`/genre/${req.params.id}/playlists?limit=${limit}`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// INICIO DEL SERVIDOR
// -----------------------------
app.listen(PORT, () => {
  console.log(`Deezer proxy server running on http://localhost:${PORT}`);
});
