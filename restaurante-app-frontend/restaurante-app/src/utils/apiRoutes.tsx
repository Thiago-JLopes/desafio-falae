//host api
export const host = "http://localhost:3000";

//rotas usuarios
export const getUsers = `${host}/api/users?`; //rota para obter todos os usuarios
export const getUser = `${host}/api/user`; //rota para ubter usuario por id
export const createUser = `${host}/api/auth/register`;//rota para cadastrar usuario
export const newLogin = `${host}/api/auth/login`;//rota para login
export const updateUser = `${host}/users`; //atualizar;
//rotas produtos
export const getProducts = `${host}/api/products`; //rota para obter produtos
export const createProducts = `${host}/api/products`; //rota para criar produto
export const updateProducts = `${host}/api/products`; //rota para atualizar produto
export const deleteProducts = `${host}/api/products`; //rota para deletar produto
//rotas para pedidos
export const createOrder = `${host}/api/orders`; //rota para criar pedido
export const getOrderById = `${host}/api/orders`; //rota que obtem os detalhes de um pedido
