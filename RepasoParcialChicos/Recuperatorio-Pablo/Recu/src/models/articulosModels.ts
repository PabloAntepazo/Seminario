import { createPool } from "mysql2/promise";
import { getSourceMapRange, resolveTypeReferenceDirective } from "typescript";

class ArticulosModel {
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
    const articulos = await this.db.query("SELECT * FROM articulost1");
    return articulos;
  }

   async comprar(carrito: any[]) {
    const pedidoId = (
        await this.db.query("INSERT INTO pedidos (calle) values(?)", ["calle"])
      )[0].insertId;
  
    for (let value of carrito) {
      const { id, cantidad, precio } = value;

      const result = (
          await this.db.query("INSERT INTO pedidos_articulos (id_pedido ,id_articulo, precio, cantidad) values(? ,?, ?, ?)", 
            [pedidoId, id, cantidad, precio])
        )[0].affectedRows;
    }
  }
}

const articulosModel: ArticulosModel = new ArticulosModel();
export default articulosModel;
