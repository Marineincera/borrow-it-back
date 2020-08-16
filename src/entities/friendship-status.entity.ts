import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { FriendshipDemand } from "./friendship-demand.entity";

@Entity("friendship-status")
export class FriendshipStatus {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: Date, nullable: true })
  updateDate?: Date;

  @Column({ type: "varchar", length: 55, nullable: false })
  name!: string;

  @OneToMany((type) => FriendshipDemand, friendshipDemand => friendshipDemand.status)
  friendshipDemands?: Array<FriendshipDemand>;
}
