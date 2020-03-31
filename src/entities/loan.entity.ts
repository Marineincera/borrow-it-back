import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Item } from './item.entity';
import { User } from './user.entity';
import { LoanStatus } from './loan-status.entity';

@Entity('loan')
export class Loan {

    @PrimaryGeneratedColumn({ type: 'int'})
    id!: number;

    @ManyToOne(type => Item, item => item.loans)
    borrowedItem!: Item;

    @ManyToOne(type => User, user => user.borrows)
    borrower!: User;

    @ManyToOne(type => User, user => user.loans)
    owner!: User;

    @Column({type: Date, nullable: true})
    borrowDate?: Date;

    @ManyToOne(type => LoanStatus, loanStatus => loanStatus.loans)
    loanStatus?: LoanStatus;
}