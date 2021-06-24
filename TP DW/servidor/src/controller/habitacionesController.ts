import { Request, Response } from 'express';
import habitacionesModel from "../models/habitacionesModel";
import jwt from "jsonwebtoken";
//import bcrypt from "bcrypt";
class HabitacionesController {

	public signin(req: Request, res: Response) {
		console.log(req.body);
		res.render("partials/signinForm");
	}
	// public async habitaiones(req: Request, res: Response) {
	// 	const { habitacion } = req.body;
	// 	const result = await habitacionesModel.listarHabitaciones(habitacion);
	// 	console.log(result);
	// 	console.log(habitacion);

    // }

}

const habitacionesController = new HabitacionesController();
export default habitacionesController;
