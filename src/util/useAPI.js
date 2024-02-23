import axios from 'axios';

export default function useAPI(){
    const api = axios.create({
        baseURL: 'localhost:3030', // Base URL for all requests
        // You can add more default settings here
    });

    return api
}