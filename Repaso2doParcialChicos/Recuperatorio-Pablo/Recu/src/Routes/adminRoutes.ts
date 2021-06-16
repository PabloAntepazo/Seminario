import adminController from "../controller/adminController";
import { Router, Request, Response } from "express";

class AdminRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/", (req: Request, res: Response) => res.send("Main!"));

        this.router.get("/home", adminController.home);
        this.router.get("/listarpedidos", adminController.listarproductos);
        this.router.get("/salir", adminController.endSession);

        this.router.get("/error", adminController.showError);

        this.router.get("/abmproductos", adminController.abm);

        this.router.get("/delete/:id", adminController.delete);

        this.router.post("/agregar/", adminController.agregar);

        this.router.post("/modificar/:id", adminController.modificar);




    }
}

const adminRoutes = new AdminRoutes();
export default adminRoutes.router;
