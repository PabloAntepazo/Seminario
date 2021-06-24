"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controller/adminController"));
class AdminRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => { res.send('Main!!!'); });
        this.router.get("/abmproductos", adminController_1.default.abm);
        this.router.delete("/delete/:id", adminController_1.default.delete);
        this.router.post("/agregar", adminController_1.default.agregar);
        this.router.post("/modificar", adminController_1.default.modificar);
    }
}
const adminRoutes = new AdminRoutes();
exports.default = adminRoutes.router;
//# sourceMappingURL=adminRoutes.js.map