import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Item } from './item.entity';
import { Opinion } from './opinion.entity';
import { Loan } from './loan.entity';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn({ type: 'int'})
    id!: number;

    @Column({type: 'varchar', length: 25, nullable: false})
    avatar?: string;

    @Column({type: 'varchar', length: 15, nullable: false})
    pseudo!: string;

    @Column({type: 'varchar', length: 15, nullable: false})
    email!: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    password!: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    city!: string;

    @Column({type: Date , nullable: false})
    registrationDate!: string;

    @Column({type: Boolean, nullable: false})
    walkingDelivery?: boolean;

    @Column({type: Boolean, nullable: false})
    letterDelivery?: boolean;

    @OneToMany(type => Item, item => item.user)
    items?: Array<Item>;

    @OneToMany(type => Loan, loan => loan.borrower)
    borrows?: Array<Loan>;

    @OneToMany(type => Loan, loan => loan.owner)
    loans?: Array<Loan>;

    @OneToMany(type => Opinion, opinion => opinion.author)
    writtenOpinions?: Array<Opinion>;

    @OneToMany(type => Opinion, opinion => opinion.addressee)
    receivedOpinions?: Array<Opinion>;

}