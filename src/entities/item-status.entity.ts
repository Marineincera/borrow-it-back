import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Item } from "./item.entity";

@Entity("itemStatus")
export class ItemStatus {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 25, nullable: false })
  name?: string;

  @Column({ type: Date, nullable: true })
  creationDate?: Date;

  // EXTRAS

  @OneToMany((type) => Item, (item) => item.itemStatus)
  items?: Array<Item>;
}
