import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { OrderItem } from "./OrderItem"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column("decimal",{precision: 10, scale: 2, nullable: false})
    price: number

    @Column({length: 255, nullable: false})
    category: string

    @Column("text")
    description: string

    @Column()
    imageUrl: string

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    items: OrderItem[]; // Relacionamento indireto com Order através de OrderItem
}