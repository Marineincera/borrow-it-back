import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Item } from "./item.entity";
import { User } from "./user.entity";

export enum noteGiven {
  un = 1,
  deux = 2,
  trois = 3,
  quatre = 4,
  cinq = 5,
}

@Entity("evaluation")
export class Evaluation {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "int", nullable: false })
  givenNote?: number;

  @ManyToOne((type) => Item, (item) => item.evaluations)
  item!: Item;

  @ManyToOne((type) => User, (user) => user.evaluations)
  user?: User;
}
