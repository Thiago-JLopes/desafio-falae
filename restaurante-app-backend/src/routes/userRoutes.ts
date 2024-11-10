import { register } from '../controllers/userController';

const router = require("express").Router();

router.post('/auth/register', register); //rota para endpoint de cadastro de usuários

export default router;
