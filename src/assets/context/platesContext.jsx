import { createContext, useEffect, useState } from 'react';
import api from '../../api/axios';
import { useAuth } from './AuthContext';

export const PlatesContext = createContext(null);

export const PlatesProvider = ({ children }) => {
  const [plates, setPlates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();

  function getErrorMessage(err) {
    if (err?.response?.data?.message) {
      return err.response.data.message;
    }
    if (err?.message) {
      return err.message;
    }
    return "Failed to load plates.";
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchPlates() {
      try {
        setLoading(true);
        setError("");

        const { data } = await api.get("/plats");
        const list = data.plats ?? data;
        if (isMounted) {
          setPlates(Array.isArray(list) ? list : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(getErrorMessage(err));
          setPlates([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (token) {
      fetchPlates();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [token]);

  function addPlate(plate) {
    setPlates((prevPlates) => {
      const maxId = prevPlates.reduce(
        (acc, item) => Math.max(acc, Number(item.id) || 0),
        0
      );
      const nextId = plate.id ?? maxId + 1;
      return [...prevPlates, { ...plate, id: nextId }];
    });
  }

  return (
    <PlatesContext.Provider value={{ plates, setPlates, loading, error, addPlate }}>
      {children}
    </PlatesContext.Provider>
  );
};