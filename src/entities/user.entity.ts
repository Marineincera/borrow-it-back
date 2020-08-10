import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Item } from "./item.entity";
import { Opinion } from "./opinion.entity";
import { Loan } from "./loan.entity";
import { Evaluation } from "./evaluation.entity";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 225, nullable: true })
  avatar?: string;

  @Column({ type: "varchar", length: 55, nullable: false, default: "" })
  pseudo!: string;

  @Column({ type: "varchar", length: 55, nullable: false, default: "" })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: false, default: "" })
  password!: string;

  @Column({ type: "varchar", length: 255, nullable: false, default: "" })
  city!: string;

  @Column({ type: Date, nullable: true })
  registrationDate?: Date;

  @Column({ type: "bool", nullable: false, default: false })
  walkingDelivery?: boolean;

  @Column({ type: "bool", nullable: false, default: false })
  letterDelivery?: boolean;

  @OneToMany((type) => Item, (item) => item.user)
  items?: Array<Item>;

  @OneToMany((type) => Loan, (loan) => loan.borrower)
  borrows?: Array<Loan>;

  @OneToMany((type) => Loan, (loan) => loan.owner)
  loans?: Loan[];

  @OneToMany((type) => Opinion, (opinion) => opinion.author)
  writtenOpinions?: Array<Opinion>;

  @OneToMany((type) => Opinion, (opinion) => opinion.addressee)
  receivedOpinions?: Array<Opinion>;

  @OneToMany((type) => Evaluation, (evaluation) => evaluation.user)
  evaluations?: Evaluation[];

  @Column({ type: "bool", default: false })
  activated?: boolean;

  @ManyToMany((type) => User)
  @JoinTable()
  friends?: User[];
}
