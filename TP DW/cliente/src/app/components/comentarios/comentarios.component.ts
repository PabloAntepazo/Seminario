import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  comentarios: any = [];
  rolPersona = localStorage.getItem('rol');
  idPersona = localStorage.getItem('idPersona');
  comentario = { comentario: "", imagen: "", personaID: this.idPersona };

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.usuariosService.listarComentario().subscribe(
      res => {
        this.comentarios = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  crearComentario() {
    console.log(this.comentario);
    this.usuariosService.guardarComentario(this.comentario).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();
      },
      err => {
        console.log(err.error.message);
      }
    )
  }

  eliminar(comentario: any) {
    this.usuariosService.eliminarComentario(comentario).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();
      },
      err => console.log(err.error.message)
    )
  }
}
