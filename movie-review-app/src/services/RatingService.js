// src/services/RatingService.js
import axios from 'axios';
import AuthService from './AuthService';


const API_URL = 'http://localhost:3004/ratings/';

const addRating = (movieId, rating, comment) => {
  const currentUser = AuthService.getCurrentUser();
  let username = "Anonymous";
  if (currentUser) {
    username = currentUser.username
  }
  return axios.post(API_URL, { movieId, rating, comment, userId: username });
};

const getRatingsByMovieId = (movieId) => {
  return axios.get(API_URL + movieId);
};

const RatingService = {
  addRating,
  getRatingsByMovieId,
};

export default RatingService;