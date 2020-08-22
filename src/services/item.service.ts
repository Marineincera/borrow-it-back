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

  async getItemsWithVisibilityForAllByKeyword(param: string) {
    const items: Item[] = await this.repository.find({
      relations: this.relationEntities,
      where: { visibility: "all" },
    });
    const results: Item[] = [];
    let num = 0;
    let done = false;
    if (items) {
      items.forEach((item) => {
        if (
          item.title.toLowerCase().includes(param) ||
          item.author?.toLocaleLowerCase().includes(param)
        ) {
          results.push(item);
        }
        if (item.tags) {
          item.tags.forEach((tag: Tag) => {
            if (tag.name.toLocaleLowerCase().includes(param)) {
              results.push(item);
            }
          });
        }
        num = num + 1;
        if (num === items.length) {
          done = true;
        }
      });
    }
    if (done) {
      return results;
    }
  }
}
