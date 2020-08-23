import { getCustomRepository } from "typeorm";

import { AbstractService } from "../core/abstract.service";
import { UserRepository } from "../repositories/user.repository";

import { User } from "../entities/user.entity";
import { FriendshipDemand } from "src/entities/friendship-demand.entity";
import { Item } from "src/entities/item.entity";
import { ItemService } from "./item.service";

/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class UserService extends AbstractService {
  protected repository = getCustomRepository(UserRepository);

  constructor() {
    super();
  }

  friends: User[] = [];

  relationEntities = [
    "items",
    "loans",
    "items.category",
    "items.tags",
    "items.itemStatus",
    "items.loans",
    "evaluations",
    "evaluations.item",
    "items.user",
    "loans.loanStatus",
    "loans.borrower",
    "loans.borrowedItem",
    "loans.owner",
    "borrows.borrowedItem",
    "borrows",
    "borrows.loanStatus",
    "borrows.borrower",
    "borrows.owner",

    "friendDemandsSend",
    "friendDemandsSend.asker",
    "friendDemandsSend.userAskedForFriend",
    "friendDemandsSend.status",
    "friendDemandsReceived",
    "friendDemandsReceived.asker",
    // "friendDemandsSend.asker.items",
    // "friendDemandsSend.userAskedForFriend.items",
    "friendDemandsReceived.status",
  ];

  getAll() {
    return this.repository.find({
      relations: this.relationEntities,
      select: ["email", "pseudo", "id", "city", "avatar"],
    });
  }

  getById(id: number) {
    return this.repository.findOne(id, {
      relations: this.relationEntities,
      where: { id },
      select: ["email", "pseudo", "id", "city", "avatar"],
    });
  }

  async activUserAccount(user: User) {
    user.activated = true;
    return await this.repository.update(user.id, user);
  }

  async getMe(id: number) {
    return await this.repository.findOne(id, {
      select: ["email", "pseudo", "id", "city", "avatar"],

      relations: this.relationEntities,
    });
  }

  async modifyAUser(id: number, user: any) {
    const userUpdated = await this.repository.update(id, user);
    // tslint:disable-next-line: max-line-length
    return this.repository.findOne(id, {
      select: ["email", "pseudo", "city", "avatar", "id"],
      relations: this.relationEntities,
    });
  }

  // add a user avatar

  async addAvatar(id: number, avatar: string) {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new Error("User not found");
    }

    user.avatar = "uploads/" + avatar;
    return this.repository.save(user);
  }

  async getFriendsByUser(id: number) {
    const connectedUser = await this.repository.findOne(id, {
      relations: this.relationEntities,
      where: { id },
    });
    let friends: User[] = [];
    let step = 0;
    if (connectedUser) {
      if (connectedUser?.friendDemandsSend) {
        let num = 0;
        connectedUser?.friendDemandsSend.forEach((friendDemandSend) => {
          if (friendDemandSend.status?.id === 2) {
            friends.push(friendDemandSend.userAskedForFriend);
          }
          num = num + 1;

          if (num === connectedUser.friendDemandsSend?.length) {
            step = 1;
          }
        });
        if (connectedUser.friendDemandsSend?.length === 0) {
          step = 2;
        }
      }
      if (connectedUser?.friendDemandsReceived) {
        let num = 0;
        connectedUser?.friendDemandsReceived.forEach((friendDemandReceived) => {
          if (friendDemandReceived.status?.id === 2) {
            friends.push(friendDemandReceived.asker);
          }
          num = num + 1;
          if (num === connectedUser.friendDemandsReceived?.length) {
            step = 2;
          }
        });
        if (connectedUser.friendDemandsReceived?.length === 0) {
          step = 2;
        }
      }
    }
    if (step === 2) {
      this.friends = friends;
      return friends;
    }
  }
}
