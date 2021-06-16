"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const articulosController_1 = __importDefault(require("../controller/articulosController"));
const express_1 = require("express");
class ArticulosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", (req, res) => res.send("Main!"));
        this.router.get("/listar", articulosController_1.default.articulos);
        this.router.post("/agregar/:id", articulosController_1.default.agregar);
        this.router.post("/vercarrito", articulosController_1.default.getCarrito);
        this.router.post("/comprar", articulosController_1.default.comprar);
    }
}
const articulosRoutes = new ArticulosRoutes();
exports.default = articulosRoutes.router;
//# sourceMappingURL=articulosRoutes.js.map