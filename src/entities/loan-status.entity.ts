import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Loan } from './loan.entity';

@Entity('loanStatus')
export class LoanStatus {

    @PrimaryGeneratedColumn({ type: 'int'})
    id!: number;

    @Column({type: 'varchar', length: 25, nullable: false})
    name!: string;

    @Column({type: Date, nullable: false})
    creationDate?: Date;
 
    @OneToMany(type => Loan, loan => loan.loanStatus)
    loans!: Array<Loan>;


    // @Column({type: Boolean, nullable: false})
    // requested?: boolean;

    // @Column({type: Boolean, nullable: false})
    // approved?: boolean;

    // @Column({type: Boolean, nullable: false})
    // returned?: boolean;

    // @Column({type: Boolean, nullable: false})
    // received?: boolean;

}