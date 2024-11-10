import { product } from "../controllers/productController"; 

const router = require("express").Router();

router.post('/product', product); //rota para endpoint de cadastro de usuários

export default router;
