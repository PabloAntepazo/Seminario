import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./Routes/indexRoutes";
import exphbs from "express-handlebars";
import path from "path";
import userRoutes from "./Routes/userRoutes";
import articulosRoutes from "./Routes/articulosRoutes";
import compraRoutes from "./Routes/compraRoutes";
import adminRoutes from "./Routes/adminRoutes";
import session from "express-session";
import flash from "connect-flash";

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any } | any; //en user guardaremos datos de interes
    carrito: { [key: string]: any } | any; //en user guardaremos datos de interes
    auth: boolean; //indicara si el usuario ha iniciado sesion o no.
    pedido_id: 1
  }
}

class Server {
  public app: Application;
  constructor() {
    this.app = express();

    this.config();
    this.routes();
  }
  config(): void {
    //Configuraciones
    this.app.set("port", process.env.PORT || 3000);
    this.app.set("views", path.join(__dirname, "views")); //indicamos que views esta en dist y no en el modulo principal
    this.app.engine(
      ".hbs",
      exphbs({
        //nombre del motor, configuracion
        defaultLayout: "main",
        layoutsDir: path.join(this.app.get("views"), "layouts"),
        partialsDir: path.join(this.app.get("views"), "partials"),
        extname: "hbs", //definimos la extension de los archivos
        helpers: require("./lib/handlebars"), //definimos donde estan los helpers
      })
    );
    this.app.set("view engine", ".hbs"); //ejecutamos el modulo definido
    //Middlewares
    this.app.use(cors()); //iniciamos cors
    this.app.use(express.json()); //habilitamos el intercambio de objetos json entre aplicaciones
    this.app.use(express.urlencoded({ extended: true })); //habilitamos para recibir datos a traves de formularios html.
    this.app.use(morgan("dev"));

    //configuracion del middeware de sesion
    this.app.use(
      session({
        secret: "secret_supersecret", //sirve para crear el hash del SSID unico
        resave: false, //evita el guardado de sesion sin modificaciones
        saveUninitialized: false, //indica que no se guarde la sesion hasta que se inicialice
      })
    );

    //Middlewares
    this.app.use(flash());

    //Variables globales
    this.app.use((req, res, next) => {
      this.app.locals.error_session = req.flash("error_session");
      this.app.locals.Articulo_Agregado = req.flash("Articulo_Agregado");
      this.app.locals.Articulo_Modificado = req.flash("Articulo_Modificado");
      this.app.locals.Articulo_Eliminado = req.flash("Articulo_Eliminado");
      next();
    });
  }
  //Van las rutas de la app
  routes(): void {
    this.app.use(indexRoutes);
    this.app.use("/user", userRoutes); //user sera un objeto existente en la app
    this.app.use("/articulos", articulosRoutes); //user sera un objeto existente en la app
    this.app.use("/compra", compraRoutes); //user sera un objeto existente en la app
    this.app.use("/admin", adminRoutes); //user sera un objeto existente en la app
  }
  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Sever escuchando " + this.app.get("port"));
    });
  }
}

const server = new Server();
server.start(); //Ejecutamos el metodo start en inica el server
