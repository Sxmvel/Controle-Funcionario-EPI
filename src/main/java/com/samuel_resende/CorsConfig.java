package com.samuel_resende;



import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Classe de configuração para permitir requisições de origem cruzada (CORS).
 * Essencial para o Frontend (React/Ant Design) acessar a API.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Aplica as regras a todos os endpoints que comecem com /api/
                .allowedOrigins("http://localhost:3000", "http://127.0.0.1:3000") // Permite acesso do endereço padrão do React
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permite os métodos CRUD e OPTIONS
                .allowedHeaders("*") // Permite todos os cabeçalhos
                .allowCredentials(true); // Permite o envio de cookies de autenticação (se necessário)
    }
}
