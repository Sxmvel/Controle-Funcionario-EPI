import axios from 'axios';

// Cria uma instância do Axios com a URL base da sua API Spring Boot
const api = axios.create({
    baseURL: 'http://localhost:8080/api', 
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;