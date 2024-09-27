// src/components/MovieDetail.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MovieService from '../services/MovieService';
import RatingService from '../services/RatingService';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    MovieService.getMovieById(id).then((response) => {
      setMovie(response.data);
    });

    RatingService.getRatingsByMovieId(id).then((response) => {
      setRatings(response.data);
      const totalRating = response.data.reduce((acc, curr) => acc + curr.rating, 0);
      const avgRating = response.data.length ? totalRating / response.data.length : 0;
      setAverageRating(avgRating);
    });
  }, [id]);

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5.");
      return;
    }
    RatingService.addRating(id, rating, comment).then((response) => {
      setRatings([...ratings, response.data]);
      setRating(0);
      setComment('');
    });
  };

  return (
    <div className="movie-detail-container">
      <h2 className="movie-title">{movie.title}</h2>
      <p className="movie-description">{movie.description}</p>
      <p className="movie-average-rating">Rating: {averageRating.toFixed(1)}</p>
      
      <form onSubmit={handleRatingSubmit} className="rating-form">
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input 
            type="number" 
            id="rating" 
            value={rating} 
            onChange={(e) => setRating(e.target.value)} 
            className="form-control" 
            placeholder="Rating"
            min="1"
            max="5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea 
            id="comment" 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            className="form-control" 
            placeholder="Comment"
          ></textarea>
        </div>
        <button type="submit" className="btn-submit">Submit Rating</button>
      </form>

      <Link to="/" className="btn-view-list">
        View Movie List
      </Link>

      <div className="ratings-section">
        <h3>Reviews</h3>
        {ratings.length === 0 ? (
          <p>No ratings yet.</p>
        ) : (
          ratings.map((rating, index) => (
            <div key={index} className="rating-item">
              <p><strong>User:</strong> {rating.userId}</p>
              <p><strong>Comment:</strong> {rating.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
