import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Item } from "./item.entity";

@Entity("category")
export class Category {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 205, nullable: false })
  name!: string;

  @Column({ type: Date, nullable: true })
  creationDate?: Date;

  //EXTRAS
  @OneToMany((type) => Item, (item) => item.category)
  items?: Item[];
}
