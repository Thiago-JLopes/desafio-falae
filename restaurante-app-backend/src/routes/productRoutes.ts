import { product, products, productFindOne } from "../api/controllers/productController"; 

const router = require("express").Router();

router.post('/products', product); //rota para endpoint de cadastro de usuários
router.get('/products', products); //rota para retornar todos os produtos
router.get('/products/:id', productFindOne); //rota para uscar um produto

export default router;
