import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Order } from "./Order"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 200, nullable: false})
    name: string

    @Column({length: 100, unique: true, nullable: false})
    email: string

    @Column("text")
    address: string

    @Column({length: 15})
    phone: string

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]
}
