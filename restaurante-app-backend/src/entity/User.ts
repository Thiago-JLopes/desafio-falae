import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 200})
    name: string

    @Column({length: 100})
    email: string

    @Column()
    address: string

    @Column()
    phone: string
}
