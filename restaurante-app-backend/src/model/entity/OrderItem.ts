import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("integer", { nullable: false })
    quantity: number;

    @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "order_id" }) // Nome explícito da coluna de chave estrangeira
    order: Order;

    @ManyToOne(() => Product, (product) => product.items, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "product_id" }) // Nome explícito da coluna de chave estrangeira
    product: Product;
}
