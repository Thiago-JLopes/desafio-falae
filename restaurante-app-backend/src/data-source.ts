import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./model/entity/User"
import { Order } from "./model/entity/Order"
import { Product } from "./model/entity/Product"
import { OrderItem } from "./model/entity/OrderItem"

//dados de conexão com BD e mapeamento da entidades
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "restaurante-app",
    synchronize: true,
    logging: false,
    entities: [User, Order, Product, OrderItem],
    migrations: [],
    subscribers: [],
})
