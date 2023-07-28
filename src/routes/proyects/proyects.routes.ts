import { Router, IRouter } from "express";
import proyectController from "./proyects.controller";
import proyectsValidations from "../../modules/proyects/proyects.validations";
import { validateSession } from "../../middlewares/authorization";

class AuthRoutes {
  public router: IRouter;

  constructor() {
    this.router = Router();
    this.setup();
  }

  private setup() {

    this.router.get("/", proyectController.getProyectDetails)
    this.router.post("/", [validateSession],proyectsValidations.createDetails(), proyectController.createDetails);
    this.router.delete("/", [validateSession],proyectsValidations.deleteDetails(), proyectController.deleteProyectDetails);
    this.router.put("/", [validateSession],proyectsValidations.updateDetails(), proyectController.updateProyectDetails);
    
    this.router.get("/assets",proyectController.getAssets)
    this.router.post("/assets",[validateSession], proyectsValidations.addAsset(), proyectController.addAsset);
    this.router.delete("/assets",[validateSession], proyectController.deleteAsset);

    this.router.get("/assets/:id",proyectsValidations.getProyectAssetsById(), proyectController.getProyectAssetsById)
  }
}

export default new AuthRoutes();
