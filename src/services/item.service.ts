import { getCustomRepository } from "typeorm";

import { AbstractService } from "../core/abstract.service";
import { ItemRepository } from "../repositories/item.repository";
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class ItemService extends AbstractService {
  protected repository = getCustomRepository(ItemRepository);

  constructor() {
    super();
  }

  relationEntities = [
    "user",
    "category",
    "tags",
    "opinions",
    "itemStatus",
    "loans",
    "console",
    "evaluations",
    "evaluations.user",
  ];

  getAll() {
    return this.repository.find({ relations: this.relationEntities });
  }

  getFilterItems(number: number) {
    return this.repository.find({
      relations: this.relationEntities,
      take: number,
    });
  }

  getById(id: number) {
    return this.repository.findOne(id, {
      relations: this.relationEntities,
      where: { id },
    });
  }
}
