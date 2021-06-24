import { createPool } from 'mysql2/promise';

class HabitacionesModel {
	private db: any;
	constructor() {
		this.config(); //aplicamos la conexion con la BD.
	}

	async config() {//Parametro de conexion con la BD.
		this.db = await createPool({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'dbhoteles',
			connectionLimit: 10
		});
	}
    async  listarHabitaciones(habitacion: object)) {
		const habitaciones: any = (await this.db.query('SELECT * FROM dwhabitaciones', [habitacion]));
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (habitaciones.length > 1)
			return habitaciones[0][0];
		return null;
	}
	
}

const habitacionesModel: HabitacionesModel = new HabitacionesModel();
export default habitacionesModel;