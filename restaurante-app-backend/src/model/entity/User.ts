import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Order } from "./Order"
import {
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
} from "class-validator";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 200, nullable: false})
    name: string

    @IsEmail()
    @Column({length: 100, unique: true, nullable: false})
    email: string

    @Column("text")
    address: string

    @Column({length: 15})
    phone: string

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]
}
