import { User } from "../../domain/entities/user.entity.js";
import { IUserRepository } from "../../domain/repositories/user.repository.js";
import { AppError } from "../../shared/errors/app.error.js";
import { CepService } from "../../shared/services/cep.service.js";
import { CreateUserDTO } from "../dtos/user.dto.js";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private cepService: CepService
  ) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const isValidCep = await this.cepService.validate(data.cep);
    if (!isValidCep) {
      throw new AppError("Invalid CEP", 400);
    }

    const user = new User(data.name, data.email, data.cep);
   
    return this.userRepository.create(user);
  }
}
