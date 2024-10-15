import { Router } from "express";

import { LoginController } from "../controllers";

const LoginRouter = Router();

LoginRouter.post("/coach", LoginController.handleLoginForCoach);
LoginRouter.post("/student", LoginController.handleLoginForStudent);

export { LoginRouter };
