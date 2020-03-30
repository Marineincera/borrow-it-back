import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Item } from './item.entity';

@Entity('itemStatus')
export class ItemStatus {

    @PrimaryGeneratedColumn({ type: 'int'})
    id!: number;

    @Column({type: Boolean, nullable: true})
    available?: boolean;

    @Column({type: Boolean, nullable: true})
    unavailable?: boolean;

    @Column({type: Boolean, nullable: true})
    borrowed?: boolean;

    @OneToMany(type => Item, item => item.itemStatus)
    items?: Array<Item>;
}