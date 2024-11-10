import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Order } from "./entity/Order"
import { Product } from "./entity/Product"
import { OrderItem } from "./entity/OrderItem"

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
