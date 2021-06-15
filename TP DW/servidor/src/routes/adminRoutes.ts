import { Router, Request, Response } from 'express';
import adminController from '../controller/adminController';

class AdminRoutes {

    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', (req: Request, res: Response) => {
            res.send('Main!!!');
            //res.render("partials/principal");
        });

        this.router.get('')
    }
}

const adminRoutes = new AdminRoutes();
export default adminRoutes.router;