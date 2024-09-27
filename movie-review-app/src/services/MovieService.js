// src/services/MovieService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:3002/movies';

const getMovies = () => {
  return axios.get(API_URL);
};

const getMovieById = (movieId) => {
    return axios.get(`${API_URL}/${movieId}`);
  };

const addMovie = (movie) => {
  return axios.post(API_URL, movie);
};

const updateMovie = (movieId, movie) => {
  return axios.put(`${API_URL}/${movieId}`, movie);
};

const deleteMovie = (movieId) => {
  return axios.delete(`${API_URL}/${movieId}`);
};

// Assign object to a variable before exporting
const MovieService = {
    getMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
  };
  
export default MovieService;