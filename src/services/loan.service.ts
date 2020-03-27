import { getCustomRepository } from 'typeorm';

import { AbstractService } from '../core/abstract.service';
import { LoanRepository } from '../repositories/loan.repository';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class LoanService extends AbstractService {

    protected repository = getCustomRepository(LoanRepository);

    constructor() {
        super();
    }

}