import { Router, Request, Response } from "express";

class CompraRoutes {
  public router: Router = Router();
  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", (req: Request, res: Response) => res.send("Main!"));

  }
}

const compraRoutes = new CompraRoutes();
export default compraRoutes.router;
