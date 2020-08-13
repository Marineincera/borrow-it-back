import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity("friendship")
export class Friendship {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: Date, nullable: true })
  updateDate?: Date;

  @ManyToOne((type) => User, (user) => user.id)
  friendA!: User;

  @ManyToOne((type) => User, (user) => user.id)
  friendB!: User;
}
