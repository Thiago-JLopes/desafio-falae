import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { OrderItem } from "./OrderItem"

export enum OrderStatus {
    PENDENTE = "Pendente",
    EM_PREPARO = "Em Preparo",
    ENTREGUE = "Entregue",
    CANCELADO = "Cancelado"
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column({precision: 10, scale: 2, nullable: false})
    totalPrice: number

    @Column({type: "enum", enum: OrderStatus, nullable: false})
    status: OrderStatus

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createAt: Date

    @ManyToOne(() => User, (user) => user.orders)
    user: User

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    items: OrderItem[];  // Relacionamento indireto com Product através de OrderItem   
}