import { Request, Response } from "express";
import compraModel from "../models/compraModels";

class CompraController {
  public signin(req: Request, res: Response) {
    console.log(req.body);
    //res.send('Sign In!!!');
    res.render("partials/signinForm");
  }

  public async carrito(req: Request, res: Response) {
    console.log(req.body);
    // if (!req.session.auth) {
    //   req.flash("error_sesson", "Debes iniciar sesion para ver esta seccion");
    //   res.redirect("./error");
    //   //res.redirect("/");
    // }
    const carrito = await compraModel.listar();
    res.render("partials/carrito");
  }

}


const compraController = new CompraController();
export default compraController;
