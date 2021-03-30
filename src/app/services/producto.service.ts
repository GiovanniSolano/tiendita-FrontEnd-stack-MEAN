import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const URL_API = environment.URL_API;


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  token: string;

  constructor(private http: HttpClient) {

    this.obtenerToken();
    
   }

  agregarProducto(producto) {
    return this.http.post(`${URL_API}/productos`, producto);
  }

  obtenerProductos() {
    return this.http.get(`${URL_API}/productos`, {
      headers: {
        'x-token': this.token
      }
    });
  }

  obtenerProductoPorID(id: string) {

    return this.http.get(`${URL_API}/productos/${id}`, {
      headers: {
        'x-token': this.token
      }
    });

  }

  obtenerToken() {
    this.token = localStorage.getItem('token');
  }




}
