import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdb from '../utils/api';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CircularProgress,
  Chip,
  Button,
  Box,
} from '@mui/material';

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [cast, setCast] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchMovieDetails();
    checkIfFavorite();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const res = await tmdb.get(`/movie/${id}`, {
        params: { append_to_response: 'videos,credits' },
      });
      setMovie(res.data);
      setCast(res.data.credits.cast.slice(0, 5));

      const trailer = res.data.videos.results.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      if (trailer) setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
    } catch (err) {
      console.error('Failed to load movie details:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some((fav) => fav.id === Number(id)));
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      const updated = favorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push({ id: movie.id, title: movie.title, poster_path: movie.poster_path });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (loading || !movie) return <Container><CircularProgress /></Container>;

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Movie Poster */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'default-poster.jpg'}
              alt={movie.title}
            />
          </Card>
        </Grid>

        {/* Movie Details */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4">{movie.title}</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {movie.release_date?.split('-')[0]} • ⭐ {movie.vote_average}
          </Typography>

          {/* Genres */}
          <Box sx={{ mb: 2 }}>
            {movie.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} sx={{ mr: 1 }} />
            ))}
          </Box>

          {/* Overview */}
          <Typography variant="body1" paragraph>{movie.overview}</Typography>

          {/* Top Cast */}
          <Typography variant="h6" gutterBottom>Top Cast:</Typography>
          {cast.length > 0 ? (
            cast.map((actor) => (
              <Typography key={actor.id}>{actor.name} as {actor.character}</Typography>
            ))
          ) : (
            <Typography>No cast available</Typography>
          )}

          {/* Trailer Button */}
          {trailerUrl && (
            <Button
              variant="contained"
              color="secondary"
              href={trailerUrl}
              target="_blank"
              sx={{ mt: 2, mr: 2 }}
            >
              Watch Trailer
            </Button>
          )}

          {/* Favorite Button */}
          <Button
            variant="outlined"
            color={isFavorite ? 'error' : 'primary'}
            onClick={toggleFavorite}
            sx={{ mt: 2 }}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
