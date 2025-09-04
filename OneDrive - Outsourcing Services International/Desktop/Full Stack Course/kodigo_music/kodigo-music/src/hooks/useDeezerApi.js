// src/hooks/useDeezerApi.js
import { useState, useEffect } from 'react';

const useDeezer = (endpointFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await endpointFunc(); // endpointFunc debe hacer fetch a /api/...
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpointFunc]);

  return { data, loading, error };
};

export default useDeezer;
