import { Pool } from "pg";
import { IUserRepository } from "../../domain/repositories/user.repository.js";
import { User } from "../../domain/entities/user.entity.js";

export class PostgresUserRepository implements IUserRepository {
  constructor(private pool: Pool) {}

  async findById(id: number): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = $1";
    const { rows } = await this.pool.query(query, [id]);

    if (rows.length === 0) return null;

    return new User(
      rows[0].name,
      rows[0].email,
      rows[0].cep,
      rows[0].id,
      rows[0].created_at
    );
  }

  async findAll(): Promise<User[]> {
    const query = "SELECT * FROM users";
    const { rows } = await this.pool.query(query);

    return rows.map(
      (row) =>
        new User(
          row.name,
          row.email,
          row.cep,
          row.id,
          row.created_at
        )
    );
  }

  async update(id: number, user: User): Promise<User> {
    const query = `
      UPDATE users
      SET name = $1, email = $2, cep = $3
      WHERE id = $4
      RETURNING *
    `;

    const { rows } = await this.pool.query(query, [
      user.name,
      user.email,
      user.cep,
      id,
    ]);

    if (rows.length === 0) {
      throw new Error("User not found");
    }

    return new User(
      rows[0].name,
      rows[0].email,
      rows[0].cep,
      rows[0].id,
      rows[0].created_at
    );
  }

  async create(user: User): Promise<User> {
    const query = `
      INSERT INTO users (name, email, cep)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    try {
      const { rows } = await this.pool.query(query, [
        user.name,
        user.email,
        user.cep,
      ]);
      return new User(
        rows[0].name,
        rows[0].email,
        rows[0].cep,
        rows[0].id,
        rows[0].created_at
      );
    } catch (error) {
      throw new Error("Error ao criar usuário");
    }
  }
}
