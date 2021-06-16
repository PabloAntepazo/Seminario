"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const articulosModels_1 = __importDefault(require("../models/articulosModels"));
class ArticulosController {
    articulos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
                res.redirect("/user/signin");
            }
            const articulos = yield articulosModels_1.default.listar();
            res.render("partials/comprar", { arts: articulos[0], mi_session: true, carrito: 0 });
        });
    }
    agregar(req, res) {
        if (!req.session.auth) {
            req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
            res.redirect("/user/signin");
        }
        const { id, nombre, cantidad, precio } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        let sessionCarrito = req.session.carrito;
        if (!sessionCarrito) {
            sessionCarrito = [];
        }
        sessionCarrito.push({ id, nombre, cantidad, precio });
        req.session.carrito = sessionCarrito;
        res.render("partials/aviso", { carrito: sessionCarrito, fin: false });
    }
    getCarrito(req, res) {
        const carrito = req.session.carrito;
        res.render("partials/aviso", { carrito: carrito, fin: true });
    }
    comprar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const carrito = req.session.carrito;
            const ok = yield articulosModels_1.default.comprar(carrito);
            res.render("partials/aviso", { carrito: {}, fin: false });
        });
    }
}
const articulosController = new ArticulosController();
exports.default = articulosController;
//# sourceMappingURL=articulosController.js.map