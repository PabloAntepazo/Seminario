import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../models/comentarioModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  API_URI = 'http://localhost:3000/user';
  API_URI2 = 'http://localhost:3000/comentario';


  logued$ = new EventEmitter<string>();
  admin$ = new EventEmitter<string>();


  constructor(private http: HttpClient, private router: Router) { }

  ingresar(usuario: any) {
    return this.http.post(`${this.API_URI}/signin`, usuario);
  }

  isLoggedIn(): Boolean {
    return !!localStorage.getItem('token'); //Si existe token retorna true
    //es el equivalente de testearlo con if pero ahora en una sola linea.
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['usuarios/inicio']);
  }

  getToken() {
    //Obtenemos el token que despues enviara el interceptor x cada req
    return localStorage.getItem('token');
  }
  registrar(usuario: any) {
    return this.http.post(`${this.API_URI}/signup`, usuario);
  }

  listarComentario() {
    return this.http.get(`${this.API_URI2}/list`);

  }

  buscarComentario(id: string) {
    return this.http.get(`${this.API_URI2}/find/${id}`);
  }

  guardarComentario(comentario: Comentario) {
    return this.http.post(`${this.API_URI2}/create`, comentario, { withCredentials: true });
  }

  eliminarComentario(comentario: any) {
    return this.http.delete(`${this.API_URI2}/delete/${comentario.id}`);
  }




}
