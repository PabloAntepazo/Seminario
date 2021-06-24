import { Router, Request, Response } from 'express';
import adminController from '../controller/adminController';

class AdminRoutes {

    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', (req: Request, res: Response) => { res.send('Main!!!'); });

        this.router.get("/abmproductos", adminController.abm);

        this.router.delete("/delete/:id", adminController.delete);

        this.router.post("/agregar", adminController.agregar);

        this.router.post("/modificar", adminController.modificar);    
    }
}

const adminRoutes = new AdminRoutes();
export default adminRoutes.router;