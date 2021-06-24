"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import bcrypt from "bcrypt";
class HabitacionesController {
    signin(req, res) {
        console.log(req.body);
        res.render("partials/signinForm");
    }
}
const habitacionesController = new HabitacionesController();
exports.default = habitacionesController;
//# sourceMappingURL=habitacionesController.js.map