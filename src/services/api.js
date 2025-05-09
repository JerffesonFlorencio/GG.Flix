import axios from 'axios';

//https://api.themoviedb.org/3/authentication

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

export default api;



