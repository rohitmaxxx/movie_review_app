// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:3005/';

const register = (username, email, password) => {
  return axios.post(API_URL + 'users', {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + 'auth/login', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        console.log("====== login resp: ", response.data)
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
