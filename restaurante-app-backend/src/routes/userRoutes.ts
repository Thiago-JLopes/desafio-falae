import { getUser, getUsers, login, register, setUsers } from '../api/controllers/userController';

const router = require("express").Router();

router.post('/auth/register', register); //rota para endpoint de cadastro de usuários
router.post('/auth/login', login); //rota para logar
router.get('/users', getUsers); //rota para obter todos os usuarios
router.get('/user/:id', getUser); //rota para obter dados do usuario pelo id
router.put('/users', setUsers); //rota para atualizar dados do usuario

export default router;
