import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Item } from './item.entity';

@Entity('itemStatus')
export class ItemStatus {

    @PrimaryGeneratedColumn({ type: 'int'})
    id!: number;

    @Column({type: Boolean, nullable: false})
    available?: boolean;

    @Column({type: Boolean, nullable: false})
    unavailable?: boolean;

    @Column({type: Boolean, nullable: false})
    borrowed?: boolean;

    @OneToMany(type => Item, item => item.itemStatus)
    items?: Array<Item>;
}