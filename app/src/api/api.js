import axios from 'axios';

const api = axios.create({
    baseURL: 'http://26.179.98.64:3003'
});


export default api;