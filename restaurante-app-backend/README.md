# Restaurante App - Backend

Este é o backend da aplicação **Restaurante App**, desenvolvido com **Node.js** e **TypeORM**, utilizando PostgreSQL como banco de dados.

## Configuração do Ambiente

### Requisitos

- **Node.js** (versão 16 ou superior)
- **PostgreSQL** (versão 13 ou superior)

### Configuração do Banco de Dados

1. **Crie o banco de dados**:  
   Acesse o terminal do PostgreSQL e execute o seguinte comando para criar o banco de dados:
   ```sql
   CREATE DATABASE restaurante_app;
2. **Configure o usuário do banco de dados**:
    - Usuário: postgres
    - Senha: postgres
    
    Se precisar criar ou alterar o usuário:
    ```bash
    CREATE USER postgres WITH PASSWORD 'postgres';
    GRANT ALL PRIVILEGES ON DATABASE restaurante_app TO postgres;
    ```
3. As tabelas do banco serão criadas automaticamente com base nas entidades definidas no projeto, graças à propriedade synchronize: true no arquivo de configuração do TypeORM.

### Configuração do Servidor
1. **Instale as dependências**:  
   Navegue até a pasta do backend e execute:
   ```bash
    npm install
    ```
2. **Inicie o servidor**:
    ```bash
    npm run dev
    ```
    O servidor estará disponível em: http://localhost:3000

## Criação de Usuários com Role Admin
   Para criar os primeiros usuários administradores, você pode usar o banco de dados diretamente ou a API.
   ### Pelo Banco de Dados
   Execute o seguinte comando SQL no terminal do PostgreSQL para criar um usuário com role `admin`:
   ```bash
      INSERT INTO "user" (name, email, address, phone, role, password, created_at, updated_at) 
      VALUES 
   ('Admin User', 'admin@example.com', 'Rua Central, 123', '123456789', 'admin', 'senha', NOW(), NOW());
   ```
   ### Pela API
   Envie uma requisição POST para a rota de registro `(/api/auth/register)` e especifique `role`: "admin" no corpo da requisição. Exemplo:
   ```json
      {
           "name": "Admin User",
           "email": "admin@example.com",
           "address": "Rua Central, 123",
           "phone": "123456789",
           "password": "senha_segura",
           "role": "admin"
      }
   ```
   
## Estrutura do Projeto

### Rotas da API

* **Autenticação:**
  * `/api/auth/register`: Registro de novos usuários.
* **Produtos:**
  * `/api/products`: Gerenciamento de produtos (listagem, criação, atualização, deleção).
* **Pedidos:**
  * `/api/orders`: Criação e visualização de pedidos.

### Modelos de Dados

* **User**
* **Product**
* **Order**
* **OrderItem**

### Diagramas

![DER](der.png)
