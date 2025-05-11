import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdb from '../utils/api';
import { Container, Typography, CircularProgress, Grid, Paper } from '@mui/material';
import MovieCard from '../components/MovieCard';

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await tmdb.get(`/movie/${id}`);
      setMovie(res.data);
    } catch (err) {
      console.error('Error fetching movie details:', err);
      setError('Failed to fetch movie details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      {loading && <CircularProgress />}
      {error && <Typography variant="h6" color="error">{error}</Typography>}
      {movie && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2 }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%' }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>{movie.title}</Typography>
            <Typography variant="body1">{movie.overview}</Typography>
            <Typography variant="h6" sx={{ marginTop: 2 }}>Genres:</Typography>
            <ul>
              {movie.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
            {/* Add more details like cast, trailer, etc. */}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default MovieDetails;
