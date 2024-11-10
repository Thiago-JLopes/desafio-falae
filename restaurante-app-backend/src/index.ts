import { AppDataSource } from "./data-source";

// Importa o módulo `express` para criar um servidor HTTP.
const express = require('express');
const app = express(); // Cria uma instância do Express.
const PORT = 3000;     // Define a porta em que o servidor vai escutar.

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
