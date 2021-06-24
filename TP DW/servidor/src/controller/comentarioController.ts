import { Request, Response } from 'express';
import flash from "connect-flash";
import jwt from "jsonwebtoken";
import comentarioModel from '../models/comentarioModel';

class ComentarioController {
    public async list(req: Request, res: Response) {
        console.log(req.header("Authorization"));
        console.log(req.body);
        //console.log(req.header("Authorization"));
        const comentario = await comentarioModel.listar();
        console.log(comentario);
        return res.json(comentario);
        //res.send('Listado de usuarios!!!');

    }

    public async find(req: Request, res: Response) {
        console.log(req.header("Authorization"));
        console.log(req.params.id);
        const { id } = req.params;
        const comentario = await comentarioModel.buscarId(id);
        if (comentario)
            return res.json(comentario);
        //res.render('./find/{{id}}');
        res.status(404).json({ message: "Comentario no Encontrado" });
    }

    public async create(req: Request, res: Response) {
        console.log(req.header("Authorization"));
        const comentario = req.body;
        console.log(req.body);

        //res.send('Usuario agregado!!!');
        // const busqueda = await comentarioModel.buscarNombre(comentario.nombre);
        // if (!busqueda) {
        const result = await comentarioModel.crear(comentario);

        return res.status(200).json({ message: 'Comentario Agregado' });
        // }
        // return res.status(403).json({ message: 'User exists!!' });
    }

    public async delete(req: Request, res: Response) {
        console.log(req.header("Authorization"));
        console.log(req.body);
        //res.send('Usuario '+ req.params.id +' Eliminado!!!');
        const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await comentarioModel.eliminar(id);
        return res.json({ message: "Comentario Eliminado" });
        //res.redirect('../controls');
    }

    public async ordenar(req: Request, res: Response) {
        console.log(req.header("Authorization"));
        console.log(req.body);
        const result = await comentarioModel.ordenar();
        //return res.json({ text: 'deleting a user ' + id });
        //res.redirect('../controls');
        console.log(result);
        return res.json(result)

    }



}

const comentarioController = new ComentarioController();
export default comentarioController;