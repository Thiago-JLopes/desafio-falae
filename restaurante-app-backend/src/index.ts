const express = require('express');
import { AppDataSource } from "./data-source";
import userRoutes from "../src/routes/userRoutes"
import productRoutes from "../src/routes/productRoutes";
import orderRoutes from "../src/routes/orderRoutes";

// Importa o módulo `express` para criar um servidor HTTP.
const app = express(); // Cria uma instância do Express.
const PORT = 3000;     // Define a porta em que o servidor vai escutar.

// Middleware para parsear JSON
app.use(express.json());

//Define as rotas
app.use('/api', userRoutes) //rota de registro de usuários
app.use('/api', productRoutes) //rota de cadastro de produtos
app.use('/api', orderRoutes) //rota criação de pedido

// Inicializa a conexão com o banco de dados utilizando o TypeORM.
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected!"); 

        // Inicia o servidor HTTP.
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`); 
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization: ", err);
    });
