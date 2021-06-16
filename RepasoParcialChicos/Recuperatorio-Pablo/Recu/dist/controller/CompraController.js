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
const compraModels_1 = __importDefault(require("../models/compraModels"));
class CompraController {
    signin(req, res) {
        console.log(req.body);
        //res.send('Sign In!!!');
        res.render("partials/signinForm");
    }
    carrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            // if (!req.session.auth) {
            //   req.flash("error_sesson", "Debes iniciar sesion para ver esta seccion");
            //   res.redirect("./error");
            //   //res.redirect("/");
            // }
            const carrito = yield compraModels_1.default.listar();
            res.render("partials/carrito");
        });
    }
}
const compraController = new CompraController();
exports.default = compraController;
//# sourceMappingURL=compraController.js.map