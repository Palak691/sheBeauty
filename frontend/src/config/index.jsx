import axios from 'axios'


export const BASE_URL = 'https://shebeauty-1.onrender.com';

export const clientServer = axios.create({
    baseURL : BASE_URL,
    withCredentials :  true
}); 