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
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
class ArticulosModel {
    constructor() {
        this.config(); //aplicamos la conexion con la BD.
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            //Parametro de conexion con la BD.
            this.db = yield promise_1.createPool({
                host: "127.0.0.1",
                user: "root",
                password: "",
                database: "pedidost1",
                connectionLimit: 10,
            });
        });
    }
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            const articulos = yield this.db.query("SELECT * FROM articulost1");
            return articulos;
        });
    }
    comprar(carrito) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedidoId = (yield this.db.query("INSERT INTO pedidos (calle) values(?)", ["calle"]))[0].insertId;
            for (let value of carrito) {
                const { id, cantidad, precio } = value;
                const result = (yield this.db.query("INSERT INTO pedidos_articulos (id_pedido ,id_articulo, precio, cantidad) values(? ,?, ?, ?)", [pedidoId, id, cantidad, precio]))[0].affectedRows;
            }
        });
    }
}
const articulosModel = new ArticulosModel();
exports.default = articulosModel;
//# sourceMappingURL=articulosModels.js.map