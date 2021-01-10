import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Item } from "./item.entity";
import { Opinion } from "./opinion.entity";
import { Loan } from "./loan.entity";
import { Evaluation } from "./evaluation.entity";
import { userInfo } from "os";
import { FriendshipDemand } from "./friendship-demand.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "text", nullable: true })
  avatar?: string;

  @Column({ type: "varchar", length: 55, nullable: false, default: "" })
  pseudo!: string;

  @Column({ type: "varchar", length: 55, nullable: false, default: "" })
  email!: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    default: "",
    select: false,
  })
  password!: string;

  @Column({ type: "varchar", length: 255, nullable: false, default: "" })
  city!: string;

  @Column({ type: Date, nullable: true })
  registrationDate?: Date;
  @Column({ type: "bool", default: false })
  activated?: boolean;

  //EXTRAS

  @OneToMany((type) => Item, (item) => item.user)
  items?: Array<Item>;

  @OneToMany((type) => Loan, (loan) => loan.borrower)
  borrows?: Array<Loan>;

  @OneToMany((type) => Loan, (loan) => loan.owner)
  loans?: Loan[];

  @OneToMany((type) => Evaluation, (evaluation) => evaluation.user)
  evaluations?: Evaluation[];

  @OneToMany(
    (type) => FriendshipDemand,
    (friendshipDemand) => friendshipDemand.asker
  )
  friendDemandsSend?: FriendshipDemand[];

  @OneToMany(
    (type) => FriendshipDemand,
    (friendshipDemand) => friendshipDemand.userAskedForFriend
  )
  friendDemandsReceived?: FriendshipDemand[];
}
