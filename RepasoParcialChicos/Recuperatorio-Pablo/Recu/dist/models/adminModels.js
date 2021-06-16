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
class AdminModel {
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
            const pedidos = yield this.db.query('SELECT * FROM pedidos');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return pedidos[0];
        });
    }
    listararticulos() {
        return __awaiter(this, void 0, void 0, function* () {
            const articulos = yield this.db.query('SELECT * FROM articulost1');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return articulos[0];
        });
    }
    eliminar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const art = (yield this.db.query('DELETE FROM articulost1 WHERE ID = ?', [id]))[0].affectedRows;
            return art;
        });
    }
    buscarNombre(descripcion) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM articulost1 WHERE descripcion = ?', [descripcion]);
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    crear(descripcion, precio) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query("INSERT INTO articulost1 (descripcion, precio) values(?, ?)", [descripcion, precio]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    actualizar(id, descripcion, precio) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE articulost1 SET descripcion = ?, precio = ?  WHERE ID = ?', [descripcion, precio, id]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
}
const adminModel = new AdminModel();
exports.default = adminModel;
//# sourceMappingURL=adminModels.js.map