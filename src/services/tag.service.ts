import { getCustomRepository } from "typeorm";

import { AbstractService } from "../core/abstract.service";
import { TagRepository } from "../repositories/tag.repository";
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class TagService extends AbstractService {
  protected repository = getCustomRepository(TagRepository);

  constructor() {
    super();
  }

  relationEntities = ["items"];

  getAll() {
    return this.repository.find({ relations: this.relationEntities });
  }

  getById(id: number) {
    return this.repository.findOne(id, {
      relations: this.relationEntities,
      where: { id },
    });
  }

  getTagsByKeyword(tag: string) {
    return this.repository.find({
      where: { name: tag },
      relations: this.relationEntities,
    });
  }
}
