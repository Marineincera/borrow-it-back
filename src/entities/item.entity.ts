import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Tag } from './tag.entity';
import { ItemStatus } from './item-status.entity';
import { Loan } from './loan.entity';

@Entity('item')
export class Item {

    @PrimaryGeneratedColumn({ type: 'int'})
    id!: number;

    @Column({type: 'varchar', length: 25, nullable: false})
    titre!: string;

    @Column({type: 'varchar', length: 25, nullable: false})
    image?: string;

    @Column({type: 'int', nullable: false})
    note?: string;

    @ManyToOne(type => User, user => user.items)
    user!: User;

    @ManyToOne(type => Category, category => category.items)
    category!: Category;

    @ManyToMany(type => Tag)
    @JoinTable()
    tags?: Array<Tag>;

    @ManyToOne(type => ItemStatus, itemStatus => itemStatus.items)
    itemStatus!: ItemStatus;

    @OneToMany(type => Loan, loan => loan.borrowedItem)
    loans!: Array<Loan>;
}