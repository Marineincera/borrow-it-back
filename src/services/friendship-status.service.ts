import { getCustomRepository } from "typeorm";

import { AbstractService } from "../core/abstract.service";
import { FriendshipStatusRepository } from "../repositories/friendship-status.repository";
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class FriendshipStatusService extends AbstractService {
  protected repository = getCustomRepository(FriendshipStatusRepository);

  constructor() {
    super();
  }

  getAll() {
    return this.repository.find();
  }

  getById(id: number) {
    return this.repository.findOne(id, {
      where: { id },
    });
  }
}
