import { createConnection } from "typeorm";
import { Category } from "../entities/category.entity";
import { Evaluation } from "../entities/evaluation.entity";
import { Friendship } from "../entities/friendship.entity";
import { FriendshipDemand } from "../entities/friendship-demand.entity";
import { FriendshipStatus } from "../entities/friendship-status.entity";
import { Item } from "../entities/item.entity";
import { ItemStatus } from "../entities/item-status.entity";
import { Loan } from "../entities/loan.entity";
import { LoanStatus } from "../entities/loan-status.entity";
import { Opinion } from "../entities/opinion.entity";
import { Tag } from "../entities/tag.entity";
import { User } from "../entities/user.entity";
import { Console } from "../entities/console.entity";
import { Token } from "../entities/token.entity";

export default async () => {
  await createConnection({
    type: "mysql",
    port: 3306,
    username: "root",
    password: process.env.BORROW_DB_PASS,
    database: process.env.BORROW_DB_DATABASE,
    entities: [
      Category,
      Console,
      Evaluation,
      Friendship,
      FriendshipDemand,
      FriendshipStatus,
      Item,
      ItemStatus,
      Loan,
      LoanStatus,
      Opinion,
      Tag,
      Token,
      User,
    ],
    synchronize: true,
  });
};
