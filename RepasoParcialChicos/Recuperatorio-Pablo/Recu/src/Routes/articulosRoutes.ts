import articulosController from "../controller/articulosController";
import { Router, Request, Response } from "express";

class ArticulosRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", (req: Request, res: Response) => res.send("Main!"));

    this.router.get("/listar", articulosController.articulos);

    this.router.post("/agregar/:id", articulosController.agregar);
    this.router.post("/vercarrito", articulosController.getCarrito);

    this.router.post("/comprar", articulosController.comprar);
  }
}

const articulosRoutes = new ArticulosRoutes();
export default articulosRoutes.router;
