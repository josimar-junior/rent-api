import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export default class User {

    @PrimaryGeneratedColumn({type: 'integer'})
    id: number;

    @Column({ nullable: false, type: 'varchar' })
    name: string;

    @Column({ nullable: false, unique: true, type: 'varchar' })
    email: string;

    @Column({ nullable: false, type: 'varchar' })
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}