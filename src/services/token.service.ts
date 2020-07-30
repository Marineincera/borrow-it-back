import { getCustomRepository } from "typeorm";
import { TokenRepository } from "../repositories/token.repository";
import { Token } from "../entities/token.entity";

export class TokenService {
  protected repository = getCustomRepository(TokenRepository);

  create(token: Token) {
    token = this.repository.create(token);
    return this.repository.save(token);
  }

  getByValue(value: string) {
    return this.repository.findOne({ value }, { relations: ["user"] });
  }
}
