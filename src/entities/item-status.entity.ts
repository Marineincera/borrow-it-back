import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Item } from './item.entity';

@Entity('itemStatus')
export class ItemStatus {

    @PrimaryGeneratedColumn({ type: 'int'})
    id!: number;

    @Column({type: Boolean, nullable: false})
    disponible?: boolean;

    @Column({type: Boolean, nullable: false})
    indisponible?: boolean;

    @Column({type: Boolean, nullable: false})
    emprunte?: boolean;

    @OneToMany(type => Item, item => item.itemStatus)
    items!: Array<Item>;
}