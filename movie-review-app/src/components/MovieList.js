// src/components/MovieList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MovieService from '../services/MovieService';
import AuthService from '../services/AuthService';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await MovieService.getMovies();
      setMovies(response.data);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  };

  const handleDelete = async (movieId) => {
    try {
      await MovieService.deleteMovie(movieId);
      setMovies(movies.filter(movie => movie._id !== movieId));
    } catch (error) {
      console.error("Failed to delete movie", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Movies</h2>
      <div className="mb-3">
        {currentUser ? (
          <>
            <button className="btn btn-danger me-2" onClick={handleLogout}>Logout</button>
            <Link to="/add-movie"><button className="btn btn-primary">Add Movie</button></Link>
          </>
        ) : (
          <>
            <Link to="/login"><button className="btn btn-primary me-2">Login</button></Link>
            <Link to="/register"><button className="btn btn-secondary me-2">Register</button></Link>
          </>
        )}
      </div>
      <ul className="list-group">
        {movies.map(movie => (
          <li key={movie._id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
            {currentUser && (
              <div>
                <Link to={`/edit-movie/${movie._id}`} className="btn btn-warning btn-sm me-2">Update</Link>
                <button onClick={() => handleDelete(movie._id)} className="btn btn-danger btn-sm">Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
