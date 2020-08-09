import { getCustomRepository } from "typeorm";

import { AbstractService } from "../core/abstract.service";
import { UserRepository } from "../repositories/user.repository";

import { User } from "../entities/user.entity";

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
  ];

  getAll() {
    return this.repository.find({
      relations: this.relationEntities,
    });
  }

  getById(id: number) {
    return this.repository.findOne(id, {
      relations: this.relationEntities,
      where: { id },
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

  // add a user avatar

  async addAvatar(id: number, avatar: string) {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new Error("User not found");
    }

    user.avatar = "uploads/" + avatar;
    return this.repository.save(user);
  }
}
