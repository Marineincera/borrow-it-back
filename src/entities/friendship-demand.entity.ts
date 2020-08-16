import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { FriendshipStatus } from "./friendship-status.entity";

@Entity("friendshipDemand")
export class FriendshipDemand {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: Date, nullable: true })
  updateDate?: Date;

  @ManyToOne((type) => User, (user) => user.id)
  asker!: User;

  @ManyToOne((type) => User, (user) => user.id)
  userAskedForFriend!: User;

  @ManyToOne(
    (type) => FriendshipStatus,
    (friendshipstatus) => friendshipstatus.id
  )
  status?: FriendshipStatus;
}
