import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Retrieve favorite movies from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (movieId) => {
    const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>Favorite Movies</Typography>
      <Grid container spacing={3}>
        {favorites.length === 0 ? (
          <Typography variant="h6" sx={{ width: '100%', textAlign: 'center' }}>No favorites added.</Typography>
        ) : (
          favorites.map(movie => (
            <Grid item xs={6} sm={4} md={3} key={movie.id}>
              <MovieCard movie={movie} />
              <Button variant="outlined" color="error" onClick={() => removeFavorite(movie.id)} sx={{ mt: 1 }}>
                Remove from Favorites
              </Button>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Favorites;
