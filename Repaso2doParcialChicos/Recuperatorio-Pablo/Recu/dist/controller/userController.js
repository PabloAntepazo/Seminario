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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModels_1 = __importDefault(require("../models/userModels"));
// const listado = [
//   { id: "1", usuario: "Juan Perez", password: "123456" },
//   { id: "2", usuario: "Pepe Cadena", password: "123456" },
//   { id: "3", usuario: "Martin Gonzalez", password: "123456" },
// ];
class UserController {
    signin(req, res) {
        console.log(req.body);
        //res.send('Sign In!!!');
        res.render("partials/signinForm");
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, password } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield userModels_1.default.buscarNombre(usuario);
            console.log(usuario);
            console.log(password);
            console.log(result);
            if ((result === null || result === void 0 ? void 0 : result.nombre) == usuario && (result === null || result === void 0 ? void 0 : result.password) == password && (result === null || result === void 0 ? void 0 : result.rol) == "admin") {
                req.session.user = result;
                req.session.auth = true;
                res.redirect("../admin/home");
                return;
            }
            else if ((result === null || result === void 0 ? void 0 : result.nombre) == usuario && (result === null || result === void 0 ? void 0 : result.password) == password) {
                req.session.user = result;
                req.session.auth = true;
                res.redirect("./home");
                return;
            }
            //res.send({ "Usuario y/o contraseña incorrectos": req.body });
            req.flash("error_session", "Usuario y/o Password Incorrectos");
            res.redirect("./error");
        });
    }
    signup(req, res) {
        console.log(req.body);
        //res.send('Sign Up!!!');
        res.render("partials/signupForm");
    }
    /*public addUser (req:Request, res:Response){
       console.log(req.body);
       //res.send('Sign In!!!');
       res.send({"Recibido":req.body});
       }*/
    home(req, res) {
        console.log(req.body);
        if (!req.session.auth) {
            req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
            res.redirect("./error");
            //res.redirect("/");
        }
        res.render("partials/home", { mi_session: true });
        //res.render("partials/home", {listado});
    }
    process(req, res) {
        console.log(req.body);
        //res.send('Datos Recibidos!!!');
        res.render("partials/home, {listado}");
    }
    //CRUD
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield userModels_1.default.listar();
            console.log(usuarios);
            return res.json(usuarios);
            //res.send('Listado de usuarios!!!');
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            const { id } = req.params;
            const usuario = yield userModels_1.default.buscarId(id);
            if (usuario)
                return res.json(usuario);
            res.status(404).json({ text: "User doesn't exists" });
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            delete usuario.repassword;
            console.log(req.body);
            //res.send('Usuario agregado!!!');
            const busqueda = yield userModels_1.default.buscarNombre(usuario.nombre);
            if (!busqueda) {
                const result = yield userModels_1.default.crear(usuario);
                return res.json({ message: "User saved!!" });
            }
            return res.json({ message: "User exists!!" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield userModels_1.default.actualizar(req.body, id);
            //res.send('Usuario '+ req.params.id +' actualizado!!!');
            return res.json({ text: "updating a user " + id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            //res.send('Usuario '+ req.params.id +' Eliminado!!!');
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield userModels_1.default.eliminar(id);
            //return res.json({ text: "deleting a user " + id });
            res.redirect("../control");
        });
    }
    //FIN CRUD
    control(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
                res.redirect("./error");
                //res.redirect("/");
            }
            //res.send('Controles');
            const usuarios = yield userModels_1.default.listar();
            //const users = usuarios;
            //res.render('partials/controls', { users: usuarios });
            res.render("partials/controls", { users: usuarios, mi_session: true });
        });
    }
    /*public async controldelete(req: Request, res: Response) {
      console.log(req.body);
      const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
      const db = await userModel.eliminar(id);
      //return res.json({text:'El usuario con ID:' + [id] + ' ha sido eliminado satisfactoriamente!' });
      //res.send('Usuario '+ req.params.id +' Eliminado!!!');
      const usuarios = await userModel.listar();
      res.render("partials/controls", { users: usuarios });
      res.redirect("../control");
    }*/
    procesar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
                res.redirect("./error");
                //res.redirect("/");
            }
            console.log(req.body);
            let usuario = req.body.usuario;
            var usuarios = [];
            console.log(usuario);
            if (usuario.length > 0) {
                for (let elemento of usuario) {
                    const encontrado = yield userModels_1.default.buscarId(elemento);
                    if (encontrado) {
                        usuarios.push(encontrado);
                        console.log(encontrado);
                    }
                }
            }
            console.log(usuarios);
            res.render("partials/seleccion", {
                usuarios,
                home: req.session.user,
                mi_session: true,
            });
            //res.send("Recibido");
        });
    }
    endSession(req, res) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }
    showError(req, res) {
        //res.send({ "Usuario y/o contraseña incorrectos": req.body });
        res.render("partials/error");
    }
}
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userController.js.map