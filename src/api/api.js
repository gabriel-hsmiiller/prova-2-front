import axios from 'axios';

const connection = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

const api = {
    getEsportes: async () => (
        connection.get('esportes')
    ),
    
    getEsporte: async (id) => (
        connection.get(`esportes/${id}`)
    ),
    
    postEsporte: async (body) => (
        connection.post('esportes', body)
    ),
}

export default api

