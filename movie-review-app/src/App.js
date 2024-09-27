// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie';
import PrivateRoute from './components/PrivateRoute';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        {/* <Route path="/add-movie" element={<AddMovie />} /> */}
        <Route path="/add-movie" element={<PrivateRoute><AddMovie /></PrivateRoute>} />
        <Route path="/edit-movie/:id" element={<PrivateRoute><EditMovie /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
