import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { OrderItem } from "./OrderItem"
import { IsUrl, Min } from "class-validator"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Min(0)
    @Column("decimal",{precision: 10, scale: 2, nullable: false})
    price: number

    @Column({length: 255, nullable: false})
    category: string

    @Column("text")
    description: string

    @IsUrl()
    @Column()
    imageUrl: string

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    items: OrderItem[]; // Relacionamento indireto com Order através de OrderItem
}