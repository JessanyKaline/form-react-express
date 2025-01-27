import { Router, Request, Response } from "express";
import { UserController } from "./user-controller.js";
import { validateUserCreation } from "./user-validator.js";
import { CreateUserDTO, UpdateUserDTO } from "../../application/dtos/user.dto.js";

export default (userController: UserController): Router => {
  const router = Router();

  router.post("/users", validateUserCreation, (req: Request<{}, {}, CreateUserDTO>, res: Response) =>
    userController.create(req, res)
  );

  router.get("/users", (req: Request, res: Response) =>
    userController.listAll(req, res)
  );

  router.put("/users/:id", (req: Request<{ id: string }, {}, UpdateUserDTO>, res: Response) =>
    userController.update(req, res)
  );

  router.get("/users/:id", (req: Request<{ id: string }>, res: Response) =>
    userController.findById(req, res)
  );

  return router;
};
