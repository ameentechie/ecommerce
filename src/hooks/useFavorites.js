import { useState, useEffect, useCallback } from 'react';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const updateLocalStorage = (updatedFavorites) => {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const addFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, product];
      updateLocalStorage(updatedFavorites);
      return updatedFavorites;
    });
  };

  const removeFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((p) => p.id !== productId);
      updateLocalStorage(updatedFavorites);
      return updatedFavorites;
    });
  };

  const toggleFavorite = (product) => {
    if (favorites.some((p) => p.id === product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const isFavorite = useCallback((productId) => {
    return favorites.some((p) => p.id === productId);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
};

export default useFavorites;
