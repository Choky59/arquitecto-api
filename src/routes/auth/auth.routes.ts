import { Router, IRouter } from "express";
import authController from "./auth.controller";
import authValidations from "../../modules/auth/auth.validations";

class AuthRoutes {
  public router: IRouter;

  constructor() {
    this.router = Router();
    this.setup();
  }

  private setup() {
    this.router.post("/", authValidations.createUser(), authController.createUser);
    this.router.post("/session", authValidations.createSession(),authController.createSession);
  }
}

export default new AuthRoutes();
