import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Item } from "./item.entity";

@Entity("tag")
export class Tag {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 25, nullable: false })
  name!: string;

  @Column({ type: Date, nullable: true })
  creationDate?: Date;

  //EXTRAS
  @ManyToMany((type) => Item, (item) => item.tags)
  items?: Item[];
}
