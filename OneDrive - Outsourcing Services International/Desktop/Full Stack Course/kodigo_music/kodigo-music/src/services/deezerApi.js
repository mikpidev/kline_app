// src/services/deezerApi.js
export const getDeezerCharts = {
  tracks: async (limit = 12) => {
    const res = await fetch(`/api/chart/tracks?limit=${limit}`);
    if (!res.ok) throw new Error('Error fetching charts');
    return res.json();
  },
  albums: async (limit = 12) => {
    const res = await fetch(`/api/chart/albums?limit=${limit}`);
    if (!res.ok) throw new Error('Error fetching charts');
    return res.json();
  },
  // ...otros endpoints
};
