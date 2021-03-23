import axios from 'axios';

export const apiBaseUrl = `https://industrialsystembackend.herokuapp.com/api`;

export const api = axios.create({
  baseURL: apiBaseUrl
});
