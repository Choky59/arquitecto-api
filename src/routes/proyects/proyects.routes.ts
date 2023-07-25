import { Router, IRouter } from "express";
import proyectController from "./proyects.controller";


class AuthRoutes {
  public router: IRouter;

  constructor() {
    this.router = Router();
    this.setup();
  }

  private setup() {
    this.router.post("/", proyectController.createProyect);
    this.router.post("/asset", proyectController.addAsset);
  }
}

export default new AuthRoutes();
