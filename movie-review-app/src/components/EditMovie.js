// src/components/EditMovie.js
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MovieService from '../services/MovieService';
import './AddMovie.css';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    director: '',
    releaseDate: '',
  });

  useEffect(() => {
    MovieService.getMovieById(id).then((response) => {
      setMovie(response.data);
    }).catch((error) => {
      console.error('Error fetching movie details:', error);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    MovieService.updateMovie(id, movie).then((response) => {
      console.log('Movie updated successfully:', response.data);
      navigate('/');
    }).catch((error) => {
      console.error('Error updating movie:', error);
    });
  };

  return (
    <div className="add-movie-container">
      <h2>Edit Movie</h2>
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
        <button type="submit" className="btn-submit">Update Movie</button>
      </form>

      <Link to="/" className="btn-view-list">
        View Movie List
      </Link>
    </div>
  );
};

export default EditMovie;
