import { getCustomRepository } from "typeorm";

import { AbstractService } from "../core/abstract.service";
import { ItemRepository } from "../repositories/item.repository";
import { Item } from "../entities/item.entity";
import { TagRepository } from "../repositories/tag.repository";
import { Tag } from "../entities/tag.entity";
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class ItemService extends AbstractService {
  protected repository = getCustomRepository(ItemRepository);
  protected tagRepository = getCustomRepository(TagRepository);

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
    "tags.items",
  ];

  getAll() {
    return this.repository.find({
      relations: this.relationEntities,
    });
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

  getAllByVisibility(enumName: string) {
    return this.repository.find({
      where: { visibility: enumName },
    });
  }

  getItemsByTitle(param: string) {
    return this.repository.find({
      where: { title: param },
    });
  }

  // getItemsByTag(tag: string) {
  //   console.log(tag);

  //   return this.tagRepository.find({
  //     where: { name: tag },
  //   });
  // }

  getItemsByKeyword(param: string) {
    return this.repository.find({
      where: { title: param } || { author: param } || { city: param },
    });
  }

  getItemsByKeywordWithVisibilityForAll(param: string) {
    const searchFirst = this.repository.find({
      where: ({ visibility: 1 } && { title: param }) || { author: param } || {
          city: param,
        },
    });
  }
}
