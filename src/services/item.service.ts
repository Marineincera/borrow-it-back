import { getCustomRepository } from "typeorm";

import { AbstractService } from "../core/abstract.service";
import { ItemRepository } from "../repositories/item.repository";
import { Item } from "../entities/item.entity";
import { FriendshipDemandRepository } from "../repositories/friendship-demand.repository";
import { Tag } from "../entities/tag.entity";
import { UserService } from "./user.service";
import { User } from "../entities/user.entity";
import { rejects } from "assert";
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class ItemService extends AbstractService {
  protected repository = getCustomRepository(ItemRepository);
  protected friendshipDemandRepository = getCustomRepository(
    FriendshipDemandRepository
  );
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
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

  async getItemsWithVisibilityByKeyword(param: string, visibility: string) {
    const items: Item[] = await this.repository.find({
      relations: this.relationEntities,
      where: { visibility: visibility } && { itemStatus: { id: 1 } },
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
          if (!results.find((element) => element.id === item.id)) {
            results.push(item);
          }
        }
        if (
          item.category?.name.toLocaleLowerCase().includes(param) ||
          item.console?.name.toLocaleLowerCase().includes(param)
        ) {
          if (!results.find((element) => element.id === item.id)) {
            results.push(item);
          }
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

  async getItemsByOwner(id: number) {
    return await this.repository.find({
      relations: this.relationEntities,
      where: { user: { id: id } } && { visibility: "friends" },
    });
  }
}
