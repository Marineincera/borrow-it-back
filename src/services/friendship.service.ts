import { getCustomRepository } from "typeorm";

import { AbstractService } from "../core/abstract.service";
import { FriendshipRepository } from "../repositories/friendship.repository";
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class FriendshipService extends AbstractService {
  protected repository = getCustomRepository(FriendshipRepository);

  constructor() {
    super();
  }

  relationEntities = ["friendA", "friendB"];

  getAll() {
    return this.repository.find({ relations: this.relationEntities });
  }

  getById(id: number) {
    return this.repository.findOne(id, {
      relations: this.relationEntities,
      where: { id },
    });
  }
}
