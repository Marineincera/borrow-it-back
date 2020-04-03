import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Item } from './item.entity';


@Entity('console')
export class Console {

    @PrimaryGeneratedColumn({ type: 'int'})
    id!: number;

    @Column({type: 'varchar', length: 55, nullable: false})
    name!: string;

    @OneToMany(type => Item, item => item.console)
    items?: Array<Item>;

}