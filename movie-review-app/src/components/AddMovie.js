// src/components/AddMovie.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import MovieService from '../services/MovieService';
import './AddMovie.css';

const AddMovie = () => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    director: '',
    releaseDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    MovieService.addMovie(movie).then((response) => {
      console.log('Movie added successfully:', response.data);
      // Optionally, you can clear the form or redirect the user after adding the movie
      setMovie({
        title: '',
        description: '',
        director: '',
        releaseDate: '',
      });
    }).catch((error) => {
      console.error('Error adding movie:', error);
    });
  };

  return (
    <div className="add-movie-container">
      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit} className="add-movie-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={movie.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={movie.description}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="director">Director</label>
          <input
            type="text"
            id="director"
            name="director"
            value={movie.director}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="releaseDate">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={movie.releaseDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn-submit">Add Movie</button>
      </form>

      {/* Improved button style */}
      <Link to="/" className="btn-view-list">
        View Movie List
      </Link>
    </div>
  );
};

export default AddMovie;
