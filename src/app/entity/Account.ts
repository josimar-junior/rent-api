import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import User from './User';

@Entity()
export default class Account {

    @PrimaryGeneratedColumn({type: 'integer'})
    id: number;

    @Column({ nullable: false, type: 'varchar' })
    name: string;

    @ManyToOne(() => User, { nullable: false })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}