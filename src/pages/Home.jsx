import { useEffect, useState } from 'react';
import tmdb from '../utils/api';
import { Container, Grid, TextField, Typography, CircularProgress, Alert } from '@mui/material';
import MovieCard from '../components/MovieCard';
import debounce from 'lodash.debounce';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      setLoading(true);
      setError(null);  // Reset error state
      const res = await tmdb.get('/trending/movie/day');
      setMovies(res.data.results);
    } catch (err) {
      console.error('Error fetching trending movies:', err);
      setError('Failed to fetch trending movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = debounce(async (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length > 2) {
      try {
        setLoading(true);
        setError(null);  // Reset error state
        const res = await tmdb.get('/search/movie', { params: { query } });
        setMovies(res.data.results);
      } catch (err) {
        console.error('Search failed:', err);
        setError('Failed to search for movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    } else {
      fetchTrendingMovies();
    }
  }, 500);  // Delay of 500ms

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>Movie Explorer</Typography>
      <TextField
        fullWidth
        label="Search Movies"
        value={searchTerm}
        onChange={handleSearch}
        margin="normal"
      />
      
      {loading && <CircularProgress />}
      
      {/* Display error message if there's an error */}
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {movies.length === 0 && !loading && !error && (
          <Typography variant="h6" sx={{ width: '100%', textAlign: 'center' }}>
            No movies found.
          </Typography>
        )}

        {movies.map((movie) => (
          <Grid item xs={6} sm={4} md={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
