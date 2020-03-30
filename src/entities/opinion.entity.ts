import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('opinion')
export class Opinion {

    @PrimaryGeneratedColumn({ type: 'int'})
    id!: number;

    @Column({type: Date, nullable: false})
    updateDate?: Date;

    @ManyToOne(type => User, user => user.id)
    author!: User;

    @ManyToOne(type => User, user => user.id)
    addressee!: User;
}