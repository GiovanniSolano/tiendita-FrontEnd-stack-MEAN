import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const URL_API = environment.URL_API;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  token: string;

  constructor(private http: HttpClient) { 


    this.obtenerToken();

  }


  busquedaPorColeccion(tabla: string, termino: string) {    

    return this.http.get(`${URL_API}/busqueda/${tabla}/${termino}`, {
      headers: {
        'x-token': this.token
      }
    });

  }

  obtenerToken() {
    this.token = localStorage.getItem('token');
  }


}
