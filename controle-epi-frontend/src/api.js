import axios from 'axios';

// Cria uma instância do Axios com a URL base da sua API Spring Boot
const api = axios.create({
    // Seu Backend está rodando em http://localhost:8080
    baseURL: 'http://localhost:8080/api', 
    // Garante que o CORS configurado no Spring funcione (e para credenciais, se fosse o caso)
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;

/*
 * Documentação:
 * Para usar:
 * 1. Importe: import api from '../api/api';
 * 2. Exemplo GET: api.get('/funcionarios');
 * 3. Exemplo POST: api.post('/funcionarios', novoFuncionario);
*/