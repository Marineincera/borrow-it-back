import { getCustomRepository } from "typeorm";

import { AbstractService } from "../core/abstract.service";
import { LoanRepository } from "../repositories/loan.repository";
import { ItemRepository } from "../repositories/item.repository";
import { Item } from "../entities/item.entity";
import { Loan } from "src/entities/loan.entity";
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class LoanService extends AbstractService {
  protected repository = getCustomRepository(LoanRepository);
  protected Itemrepository = getCustomRepository(ItemRepository);

  constructor() {
    super();
  }

  relationEntities = ["borrower", "owner", "borrowedItem", "loanStatus"];

  getAll() {
    return this.repository.find({
      relations: this.relationEntities,
      select: [
        "id",
        "loanStatus",
        "owner",
        "borrower",
        "borrowedItem",
        "borrowDate",
      ],
    });
  }

  getById(id: number) {
    return this.repository.findOne(id, {
      relations: this.relationEntities,
      where: { id },
      select: [
        "id",
        "loanStatus",
        "owner",
        "borrower",
        "borrowedItem",
        "borrowDate",
      ],
    });
  }
}
