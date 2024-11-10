import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Order } from "./Order"
import { Product } from "./Product"

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column("integer", {nullable: false})
    qunantity: number

    @ManyToOne(() => Order, (order) => order.items, {
        onDelete: "CASCADE",
        nullable: false
    })
    order: Order

    @ManyToOne(() => Product, (product) => product.items, { 
        onDelete: "CASCADE", 
        nullable: false 
    })
    product: Product;
}