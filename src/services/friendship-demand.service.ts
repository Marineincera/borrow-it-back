import { getCustomRepository } from "typeorm";

import { AbstractService } from "../core/abstract.service";
import { FriendshipRepository } from "../repositories/friendship.repository";
import { FriendshipDemandRepository } from "../repositories/friendship-demand.repository";
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class FriendshipDemandService extends AbstractService {
  protected repository = getCustomRepository(FriendshipDemandRepository);

  constructor() {
    super();
  }

  relationEntities = ["status", "asker", "userAskedForFriend"];

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
