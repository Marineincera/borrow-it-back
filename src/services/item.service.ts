import { getCustomRepository } from 'typeorm';

import { AbstractService } from '../core/abstract.service';
import { ItemRepository } from '../repositories/item.repository';
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

}