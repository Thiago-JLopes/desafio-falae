import { product, products, productFindOne, updateProduct, deleteProduct } from "../api/controllers/productController"; 

const router = require("express").Router();

router.post('/products', product); //rota para endpoint de cadastro de usuários
router.get('/products', products); //rota para retornar todos os produtos
router.get('/products/:id', productFindOne); //rota para uscar um produto
router.put('/products/:id', updateProduct); //rota para atualizar dados de um produto
router.delete('/products/:id', deleteProduct); //rota para deletar produto por ID

export default router;
