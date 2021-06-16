import { createPool } from 'mysql2/promise';

class AdminModel {
    private db: any;
    constructor() {
        this.config(); //aplicamos la conexion con la BD.
    }

    async config() {
        //Parametro de conexion con la BD.
        this.db = await createPool({
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "pedidost1",
            connectionLimit: 10,
        });
    }

    async listar() {

        const pedidos = await this.db.query('SELECT * FROM pedidos');
        //console.log(usuarios[0]);
        //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
        return pedidos[0];

    }

    async listararticulos() {
        const articulos = await this.db.query('SELECT * FROM articulost1');
        //console.log(usuarios[0]);
        //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
        return articulos[0];
    }

    async eliminar(id: string) {
        const art = (await this.db.query('DELETE FROM articulost1 WHERE ID = ?', [id]))[0].affectedRows;
        return art;
    }

    async buscarNombre(descripcion: string) {
        const encontrado: any = await this.db.query('SELECT * FROM articulost1 WHERE descripcion = ?', [descripcion]);
        if (encontrado.length > 1)
            return encontrado[0][0];
        return null;
    }

    async crear(descripcion: string, precio: number) {
        const result = (await this.db.query("INSERT INTO articulost1 (descripcion, precio) values(?, ?)", [descripcion, precio]))[0].affectedRows;
        console.log(result);
        return result;
    }

    async actualizar(id: string, descripcion: string, precio: number) {
        const result = (await this.db.query('UPDATE articulost1 SET descripcion = ?, precio = ?  WHERE ID = ?', [descripcion, precio, id]))[0].affectedRows;
        console.log(result);
        return result;
    }
}



const adminModel: AdminModel = new AdminModel();
export default adminModel;