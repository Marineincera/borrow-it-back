import { getCustomRepository } from 'typeorm';

import { AbstractService } from '../core/abstract.service';
import { OpinionRepository } from '../repositories/opinion.repository';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class OpinionService extends AbstractService {

    protected repository = getCustomRepository(OpinionRepository);

    constructor() {
        super();
    }

    relationEntities = ['author', 'addressee', 'item']

    getAll() {
        return this.repository.find({ relations: this.relationEntities });
    }

    getById(id: number) {
        return this.repository.findOne(id, { relations: this.relationEntities, where: { id } });
    }
}