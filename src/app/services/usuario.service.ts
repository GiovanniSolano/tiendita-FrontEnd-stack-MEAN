import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';
import {catchError, map} from 'rxjs/operators';
import { of } from 'rxjs';

const URL_API = environment.URL_API;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;

  constructor(private http: HttpClient) { }



  loginUsuario(usuario: Usuario) {

    return this.http.post(`${URL_API}/auth`, usuario);

  }

  validarToken() {

    const token = localStorage.getItem('token');
    

    return this.http.get(`${URL_API}/auth/renuevaToken`, {
      headers: {
        'x-token': token 
      }
    }).pipe(map(resp => {

      const  
        {nombre,
        fechaNacimiento,
        role,
        telefono,
        correo,
        uid
      } = resp['usuario'];      

      this.usuario = new Usuario(nombre, fechaNacimiento, role, telefono, correo, '', uid);
      localStorage.setItem('token', resp['token']);
      return true;



    }),
    catchError(error => of(false)));

  }

  estaLogueado(): boolean {

    const token = localStorage.getItem('token');

    return (token) ? true : false;

  }

}
