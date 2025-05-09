import axios from 'axios';

//https://api

const api = axios.create({
    baseURL: 'https://api.add.com',
});

export default api;



