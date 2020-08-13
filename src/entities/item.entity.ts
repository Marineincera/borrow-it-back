import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";
import { Tag } from "./tag.entity";
import { ItemStatus } from "./item-status.entity";
import { Loan } from "./loan.entity";
import { Opinion } from "./opinion.entity";
import { Console } from "./console.entity";
import { Evaluation } from "./evaluation.entity";

@Entity("item")
export class Item {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  title!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  author?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  image?: string;

  @Column({ type: "varchar", length: 555, nullable: true })
  description?: string;

  @Column({ type: "int", nullable: true })
  note?: number;

  @ManyToOne((type) => User, (user) => user.items)
  user!: User;

  @ManyToOne((type) => Category, (category) => category.items)
  category!: Category;

  @ManyToOne((type) => Console, (console) => console.items)
  console?: Console;

  @ManyToMany((type) => Tag, (tags) => tags.items)
  @JoinTable()
  tags?: Tag[];

  @ManyToOne((type) => ItemStatus, (itemStatus) => itemStatus.items)
  itemStatus?: ItemStatus;

  @OneToMany((type) => Loan, (loan) => loan.borrowedItem)
  loans?: Loan[];

  @OneToMany((type) => Opinion, (opinion) => opinion.item)
  opinions?: Opinion[];

  @OneToMany((type) => Evaluation, (evaluation) => evaluation.item)
  evaluations?: Evaluation[];
}
