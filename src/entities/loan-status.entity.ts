import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Loan } from "./loan.entity";

@Entity("loanStatus")
export class LoanStatus {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @Column({ type: Date, nullable: true })
  creationDate?: Date;

  //EXTRAS
  @OneToMany((type) => Loan, (loan) => loan.loanStatus)
  loans?: Array<Loan>;
}
