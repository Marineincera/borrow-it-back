import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("token")
export class Token {
  @PrimaryGeneratedColumn({})
  id!: number;

  @Column({})
  value!: string;

  @OneToOne((type) => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user!: User;
}
