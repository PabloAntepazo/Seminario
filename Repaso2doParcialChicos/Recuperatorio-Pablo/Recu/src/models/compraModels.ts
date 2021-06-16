import { createPool } from "mysql2/promise";

class CompraModel {
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
    //Devuelve todas las filas de la tabla usuario
    //const db=this.connection;
    const articulos = await this.db.query("SELECT * FROM articulost1");
    //console.log(usuarios[0]);
    //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
    return articulos;
  }

  
}

const compraModel: CompraModel = new CompraModel();
export default compraModel;
