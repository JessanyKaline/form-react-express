import { Pool } from "pg";
import { User } from "../../domain/entities/user.entity.js";
import { IUserRepository } from "../../domain/repositories/user.repository.js";

export class UserRepository implements IUserRepository {
  constructor(private pool: Pool) {}

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    return new User(row.name, row.email, row.cep);
  }

  async create(user: User): Promise<User> {
    const result = await this.pool.query(
      "INSERT INTO users (name, email, cep) VALUES ($1, $2, $3) RETURNING *",
      [user.name, user.email, user.cep]
    );
    const row = result.rows[0];
    return new User(row.name, row.email, row.cep);
  }

  async findAll(): Promise<User[]> {
    const result = await this.pool.query("SELECT * FROM users");
    return result.rows.map(row => new User(row.name, row.email, row.cep));
  }

  async findById(id: number): Promise<User | null> {
    const result = await this.pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    return new User(row.name, row.email, row.cep);
  }

  async update(id: number, user: User): Promise<User> {
    const result = await this.pool.query(
      "UPDATE users SET name = $1, email = $2, cep = $3 WHERE id = $4 RETURNING *",
      [user.name, user.email, user.cep, id]
    );
    const row = result.rows[0];
    return new User(row.name, row.email, row.cep);
  }
}
