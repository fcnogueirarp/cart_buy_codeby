import axios from 'axios';

export const apiUp = axios.create({
  baseURL: 'http://localhost:3001/items',
});

export const apiDown = axios.create({
  baseURL: 'http://localhost:3333/items',
});
