import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(storedFavorites.some(m => m.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = storedFavorites.filter(m => m.id !== movie.id);
    } else {
      updatedFavorites = [...storedFavorites, movie];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Card sx={{ position: 'relative' }}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>

      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" noWrap>{movie.title}</Typography>
        <IconButton onClick={toggleFavorite}>
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
