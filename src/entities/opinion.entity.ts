import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Item } from './item.entity';

@Entity('opinion')
export class Opinion {

    @PrimaryGeneratedColumn({ type: 'int'})
    id!: number;

    @Column({type: Date, nullable: true})
    updateDate?: Date;

    @Column({type: 'varchar', length: 500, nullable: false})
    message!: string;

    @ManyToOne(type => User, user => user.id)
    author!: User;

    @ManyToOne(type => User, user => user.id)
    addressee!: User;

    @ManyToOne(type => Item, item => item.id)
    item!: Item;
}