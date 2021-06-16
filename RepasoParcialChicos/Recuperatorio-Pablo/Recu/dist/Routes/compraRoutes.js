"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class CompraRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", (req, res) => res.send("Main!"));
    }
}
const compraRoutes = new CompraRoutes();
exports.default = compraRoutes.router;
//# sourceMappingURL=compraRoutes.js.map