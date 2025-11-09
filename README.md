# 🛡️ Sistema de Controle de Funcionários e EPIs

Este projeto implementa um sistema completo de gestão de Funcionários, 
Equipamentos de Proteção Individual (EPIs) 
e o registro de suas distribuições (CRUD N:N).

## 1. Visão Geral do Projeto

O sistema foi desenvolvido seguindo a arquitetura em camadas (Model-View-Controller/Service/Repository) 
e prioriza um design moderno, minimalista e responsivo (Azul e Branco), 
utilizando componentes Ant Design.

### 1.1. Tecnologias Utilizadas

| Camada | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Backend** | **Java (Spring Boot 3.x)** | Servidor RESTful, injeção de dependência e gerenciamento de transações. |
| **Persistência** | **Spring Data JPA / Hibernate** | Mapeamento Objeto-Relacional. |
| **Banco de Dados** | **MySQL** | Banco de dados relacional para persistência de dados. |
| **Frontend** | **React.js + Vite** | Biblioteca para construção da interface de utilizador. |
| **Design** | **Ant Design (AntD)** | Biblioteca de componentes para UI moderna e responsiva. |
| **Ferramentas** | **Maven** | Gerenciamento de dependências e construção do projeto Java. |

### 1.2. Entidades e Relacionamentos

O projeto cumpre o requisito de envolver pelo menos duas entidades com relacionamento  através de um modelo de dados robusto:

| Entidade | Propósito | Chave Primária |
| :--- | :--- | :--- |
| **`Funcionario`** | Cadastro básico (Nome, CPF, Matrícula, Função). | `id_funcionario` |
| **`EPI`** | Cadastro dos tipos de EPIs (Tipo, Nº CA, Validade). | `id_epi` |
| **`EntregaEPI`** | **Tabela de Relacionamento N:N**. Registra quem (`id_funcionario`) recebeu qual EPI (`id_epi`), quando (`data_entrega`) e a quantidade. | `id_entrega` |

## 2. Requisitos de Execução

Para rodar o projeto, você precisará de:

* JDK (Java Development Kit) 17 ou superior.
* Node.js (com npm ou Yarn) para o Frontend.
* Servidor MySQL instalado localmente (na porta 3306).

### 2.1. Configuração do Banco de Dados

1.  **Crie o Banco de Dados:** O sistema espera que o banco de dados principal (ou o schema) esteja criado.
    > No seu MySQL (Workbench/CLI), crie o banco de dados principal usado na conexão (Ex: `samuel_resende`).

2.  **Execute o Script SQL:** Execute o script SQL fornecido (`script_mysql.sql`) para criar as tabelas `Funcionario`, `EPI` e `EntregaEPI` e inserir dados de exemplo.

3.  **Configure a Conexão:** Verifique o arquivo `src/main/resources/application.properties` e atualize as credenciais (`username` e `password`) e o nome do banco (`samuel_resende`).

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/samuel_resende?serverTimezone=America/Sao_Paulo&useSSL=false
    spring.datasource.username=root 
    spring.datasource.password=sua_senha
    ```

## 3. Como Executar o Sistema

Execute o Backend e o Frontend em dois terminais separados.

### 3.1. Iniciar o Backend (Java/Spring Boot)

1.  Abra o Terminal na pasta raiz do projeto (onde está o `pom.xml`).
2.  Execute o comando:
    ```bash
    ./mvnw spring-boot:run
    ```
3.  **Verificação:** O servidor deve iniciar em `http://localhost:8080`.

### 3.2. Iniciar o Frontend (React/Ant Design)

1.  Abra um **novo** Terminal e navegue até a pasta do Frontend:
    ```bash
    cd controle-epi-frontend
    ```
2.  Instale as dependências (se ainda não o fez):
    ```bash
    npm install
    ```
3.  Execute o Frontend:
    ```bash
    npm run dev
    ```
4.  **Verificação:** A aplicação abrirá no seu navegador, geralmente em `http://localhost:5173`.

## 4. Funcionalidades da Aplicação (CRUD)

| Página | Funcionalidade | Endpoints API Utilizados |
| :--- | :--- | :--- |
| **Funcionários** | CRUD completo com listagem em **Cards**. Visualização detalhada (Inspecionar) com histórico de EPIs. | `/api/funcionarios`, `/api/entregas/historico/funcionario/{id}` |
| **EPIs** | CRUD completo com listagem por **Cards de Categoria**. Listagem e agrupamento de EPIs por tipo. | `/api/epis` |
| **Registrar Entrega** | Criação (POST) do registro N:N, com *dropdowns* dinâmicos de Funcionários e EPIs. | `/api/entregas` |

---
