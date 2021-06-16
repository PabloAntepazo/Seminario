import { Request, Response } from "express";
import adminModel from "../models/adminModels";
import flash from "connect-flash";

class AdminController {

    public home(req: Request, res: Response) {
        console.log(req.body);
        if (!req.session.auth) {
            req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
            res.redirect("./error");
            //res.redirect("/");
        }
        res.render("partials/admin", { mi_session: true });
        //res.render("partials/home", {listado});
    }

    public async listarproductos(req: Request, res: Response) {
        if (!req.session.auth) {
            req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
            res.redirect("./error");
            //res.redirect("/");
        }
        console.log(req.body);
        const pedidos = await adminModel.listar();
        res.render("partials/listado", { pedidos: pedidos, mi_session: true })
    }

    public endSession(req: Request, res: Response) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }

    public showError(req: Request, res: Response) {
        //res.send({ "Usuario y/o contraseña incorrectos": req.body });
        res.render("partials/error");
    }

    public async abm(req: Request, res: Response) {
        // if (!req.session.auth) {
        //     req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
        //     res.redirect("./error");
        //     //res.redirect("/");
        // }
        console.log(req.body);
        const articulos = await adminModel.listararticulos();
        //res.render("partials/listadoArts", { articulos, mi_session: true })
        console.log(articulos);
        //return res.status(403).json({ message: "Usuario y/o contraseña incorrectos" });
        return res.json(articulos);
    }

    public async delete(req: Request, res: Response) {
        console.log(req.body);
        const { id } = req.params;
        const articulos = await adminModel.eliminar(id);
        req.flash("Articulo_Eliminado", "Se ha eliminado un articulo!!");
        res.redirect("../abmproductos");

    }

    public async agregar(req: Request, res: Response) {
        const { descripcion, precio } = req.body;
        console.log(req.body);

        const busqueda = await adminModel.buscarNombre(descripcion);
        if (!busqueda) {
            const result = await adminModel.crear(descripcion, precio);
        }
        req.flash("Articulo_Agregado", "Se ha agregado un articulo!!");
        res.redirect("../abmproductos");

    }

    public async modificar(req: Request, res: Response) {
        const { id, descripcion, precio } = req.body;
        console.log(req.body);
        const result = await adminModel.actualizar(id, descripcion, precio);
        req.flash("Articulo_Modificado", "Se ha modificado un articulo!!");
        res.redirect("../abmproductos");


    }
}

const adminController = new AdminController();
export default adminController;