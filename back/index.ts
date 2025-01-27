import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./src/infrastructure/database/database.config.js";
import { PostgresUserRepository } from "./src/infrastructure/database/user.repository.js";
import { CepService } from "./src/shared/services/cep.service.js";
import { CreateUserUseCase } from "./src/application/use-cases/create-user.useCase.js";
import { ListUsersUseCase } from "./src/application/use-cases/list-users.useCase.js";
import { UpdateUserUseCase } from "./src/application/use-cases/update-user.useCase.js";
import { FindUserByIdUseCase } from "./src/application/use-cases/find-user-by-id.useCase.js";
import { UserController } from "./src/infrastructure/http/user-controller.js";
import userRoutes from "./src/infrastructure/http/user.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const userRepository = new PostgresUserRepository(pool);
const cepService = new CepService();
const createUserUseCase = new CreateUserUseCase(userRepository, cepService);
const listUsersUseCase = new ListUsersUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
const userController = new UserController(createUserUseCase, listUsersUseCase, updateUserUseCase, findUserByIdUseCase);

app.use("/api", userRoutes(userController));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
