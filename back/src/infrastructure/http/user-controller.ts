import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/create-user.useCase.js';
import { ListUsersUseCase } from '../../application/use-cases/list-users.useCase.js';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.useCase.js';
import { FindUserByIdUseCase } from '../../application/use-cases/find-user-by-id.useCase.js';
import { CreateUserDTO, UpdateUserDTO } from '../../application/dtos/user.dto.js';

export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private listUsersUseCase: ListUsersUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private findUserByIdUseCase: FindUserByIdUseCase
    ) {}

    async create(req: Request<{}, {}, CreateUserDTO>, res: Response): Promise<Response> {
        try {
            const user = await this.createUserUseCase.execute(req.body);
            return res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async listAll(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.listUsersUseCase.execute();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async update(req: Request<{ id: string }, {}, UpdateUserDTO>, res: Response): Promise<Response> {
        try {
            const user = await this.updateUserUseCase.execute(Number(req.params.id), req.body);
            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async findById(req: Request<{ id: string }>, res: Response): Promise<Response> {
        try {
            const user = await this.findUserByIdUseCase.execute(Number(req.params.id));
            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}