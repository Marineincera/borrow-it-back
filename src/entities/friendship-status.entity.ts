import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("friendship-status")
export class FriendshipStatus {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: Date, nullable: true })
  updateDate?: Date;

  @Column({ type: "varchar", length: 55, nullable: false })
  name!: string;
}
