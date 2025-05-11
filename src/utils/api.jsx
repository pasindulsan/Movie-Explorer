// utils/api.js
import axios from 'axios';

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: 'fd8e19c7ad8a46c6431353c2fef50dc0' }
});

export default tmdb;

