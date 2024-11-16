import { createOrder, deleteOrder, getOrder } from "../api/controllers/oderController";

const router = require("express").Router();

router.post('/orders', createOrder); //rota para criar pedido
router.get('/orders/:id', getOrder); //rota para obter um pedido
router.delete('/orders/:id', deleteOrder); //roda para exluir um pedido

export default router;