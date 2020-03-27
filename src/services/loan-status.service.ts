import { getCustomRepository } from 'typeorm';

import { AbstractService } from '../core/abstract.service';
import { LoanStatusRepository } from '../repositories/loan-status.repository';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class LoanStatusService extends AbstractService {

    protected repository = getCustomRepository(LoanStatusRepository);

    constructor() {
        super();
    }

}