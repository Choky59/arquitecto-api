import { Router, IRouter } from "express";
import authRoutes from "./auth/auth.routes";
import proyectsRoutes from "./proyects/proyects.routes";
import { validateSession } from "../middlewares/authorization";
class ApiRoutes {
  public router: IRouter;

  constructor() {
    this.router = Router();
    this.setup();
  }
  private setup() {
    this.router.use("/authentication", authRoutes.router);
    this.router.use("/proyects", [validateSession], proyectsRoutes.router);
  }
}
export default new ApiRoutes();
