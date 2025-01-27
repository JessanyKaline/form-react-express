import { User } from "../../domain/entities/user.entity.js";
import { IUserRepository } from "../../domain/repositories/user.repository.js";
import { AppError } from "../../shared/errors/app.error.js";
import { UpdateUserDTO } from "../dtos/user.dto.js";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number, data: UpdateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new AppError("User not found", 404);
    }

    existingUser.name = data.name || existingUser.name;
    existingUser.email = data.email || existingUser.email;
    existingUser.cep = data.cep || existingUser.cep;

    return this.userRepository.update(id, existingUser);
  }
}
