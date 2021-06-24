import { Router, Request, Response } from 'express';
import comentarioController from '../controller/comentarioController';

class ComentarioRoutes {

    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', (req: Request, res: Response) => {
            //res.send('Main!!!');
            //se pone antes de cargar la primera ruta, para inicializar las variables de sesiones.
            req.session.auth = false;
            req.session.user = {};
            //res.render("partials/principal");
        });

        this.router.get('/list', comentarioController.list);
        this.router.get('/find/:id', comentarioController.find);
        this.router.post('/create', comentarioController.create);
        this.router.delete('/delete/:id', comentarioController.delete);
        this.router.get('/ordenar', comentarioController.ordenar);

    }
}


const comentarioRoutes = new ComentarioRoutes();
export default comentarioRoutes.router;