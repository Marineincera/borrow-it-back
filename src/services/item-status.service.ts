import { getCustomRepository } from 'typeorm';

import { AbstractService } from '../core/abstract.service';
import { ItemStatusRepository } from '../repositories/item-status.repository';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class ItemStatusService extends AbstractService {

    protected repository = getCustomRepository(ItemStatusRepository);

    constructor() {
        super();
    }

    relationEntities = ['items'];

    getAll() {
        return this.repository.find({ relations: this.relationEntities });
    }

    getById(id: number) {
        return this.repository.findOne(id, { relations: this.relationEntities, where: { id } });
    }


}