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
const adminModels_1 = __importDefault(require("../models/adminModels"));
class AdminController {
    home(req, res) {
        console.log(req.body);
        if (!req.session.auth) {
            req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
            res.redirect("./error");
            //res.redirect("/");
        }
        res.render("partials/admin", { mi_session: true });
        //res.render("partials/home", {listado});
    }
    listarproductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
                res.redirect("./error");
                //res.redirect("/");
            }
            console.log(req.body);
            const pedidos = yield adminModels_1.default.listar();
            res.render("partials/listado", { pedidos: pedidos, mi_session: true });
        });
    }
    endSession(req, res) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }
    showError(req, res) {
        //res.send({ "Usuario y/o contraseña incorrectos": req.body });
        res.render("partials/error");
    }
    abm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
                res.redirect("./error");
                //res.redirect("/");
            }
            console.log(req.body);
            const articulos = yield adminModels_1.default.listararticulos();
            res.render("partials/listadoArts", { articulos, mi_session: true });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const articulos = yield adminModels_1.default.eliminar(id);
            req.flash("Articulo_Eliminado", "Se ha eliminado un articulo!!");
            res.redirect("../abmproductos");
        });
    }
    agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { descripcion, precio } = req.body;
            console.log(req.body);
            const busqueda = yield adminModels_1.default.buscarNombre(descripcion);
            if (!busqueda) {
                const result = yield adminModels_1.default.crear(descripcion, precio);
            }
            req.flash("Articulo_Agregado", "Se ha agregado un articulo!!");
            res.redirect("../abmproductos");
        });
    }
    modificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, descripcion, precio } = req.body;
            console.log(req.body);
            const result = yield adminModels_1.default.actualizar(id, descripcion, precio);
            req.flash("Articulo_Modificado", "Se ha modificado un articulo!!");
            res.redirect("../abmproductos");
        });
    }
}
const adminController = new AdminController();
exports.default = adminController;
//# sourceMappingURL=adminController.js.map