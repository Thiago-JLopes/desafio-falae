import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

export enum OrderStatus {
    PENDENTE = "Pendente",
    EM_PREPARO = "Em Preparo",
    ENTREGUE = "Entregue",
    CANCELADO = "Cancelado"
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    totalPrice: number;

    @Column({ type: "enum", enum: OrderStatus, nullable: false })
    status: OrderStatus;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createAt: Date;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: "user_id" }) // Nome explícito da coluna de chave estrangeira
    user: User;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    items: OrderItem[];
}
