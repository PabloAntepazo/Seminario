import { Request, Response } from "express";
import flash from "connect-flash";
import articulosModel from "../models/articulosModels";
import { getLineAndCharacterOfPosition } from "typescript";

class ArticulosController {
  public async articulos(req: Request, res: Response) {
    if (!req.session.auth) {
      req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
      res.redirect("/user/signin");
    }

    const articulos = await articulosModel.listar();
    res.render("partials/comprar", { arts: articulos[0], mi_session: true, carrito: 0 });
  }

  public agregar(req: Request, res: Response) {
    if (!req.session.auth) {
      req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
      res.redirect("/user/signin");
    }

    const { id, nombre, cantidad, precio } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.

    let sessionCarrito = req.session.carrito;

    if (!sessionCarrito) {
      sessionCarrito = [];
    } 

    sessionCarrito.push({id, nombre, cantidad, precio});
    req.session.carrito = sessionCarrito;

    res.render("partials/aviso", { carrito: sessionCarrito, fin: false });
  }

  public getCarrito(req: Request, res: Response) {
    const carrito = req.session.carrito
    res.render("partials/aviso", { carrito: carrito, fin: true });
  }

  public async comprar(req: Request, res: Response) {
    const carrito = req.session.carrito
    const ok = await articulosModel.comprar(carrito);
    res.render("partials/aviso", { carrito: {}, fin: false });
  }
}

const articulosController = new ArticulosController();
export default articulosController;
