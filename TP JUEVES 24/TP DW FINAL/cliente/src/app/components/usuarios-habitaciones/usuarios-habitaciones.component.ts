import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-usuarios-habitaciones',
  templateUrl: './usuarios-habitaciones.component.html',
  styleUrls: ['./usuarios-habitaciones.component.css']
})
export class UsuariosHabitacionesComponent implements OnInit {

  rol: any = "";
  habitaciones: any = [];
  nuevaHab = { categoria: "", descripcion: "", precio: undefined }
  constructor(private usuarioService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol');
    this.usuarioService.abmhabitaciones().subscribe(
      res => {
        this.habitaciones = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }


  modificar(habitacion: any) {
    console.log(habitacion);
    this.usuarioService.actualizarHabitacion(habitacion).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();
      },
      err => console.log(err)
    )
  }

  eliminar(habitacion: any) {
    console.log("Eliminanda la habitacion: " + habitacion.idH);
    this.usuarioService.eliminarHabitacion(habitacion).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();
      },
      err => console.log(err.error.message)
    )
  }


  agregar() {
    console.log(this.nuevaHab);
    this.usuarioService.guardarHabitacion(this.nuevaHab).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();
      },
      err => console.log(err)
    )
  }

}
