import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("token")
export class Token {
  @PrimaryGeneratedColumn({})
  id!: number;

  @Column({})
  value!: string;

  @Column()
  expiration!: Date;

  @OneToOne((type) => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user!: User;
}
