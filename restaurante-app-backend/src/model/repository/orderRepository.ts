import { AppDataSource } from "../../data-source";
import { Order } from "../entity/Order"; 

//pedido repository
export const OrderRepository = AppDataSource.getRepository(Order);