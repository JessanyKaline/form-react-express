import { User } from "../entities/user.entity.js";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  update(id: number, user: User): Promise<User>;
}
