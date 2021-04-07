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
    return this.http.post(`${URL_API}/productos`, producto, {
      headers: {
        'x-token': this.token
      }
    });
  }

  editarProducto(id, producto) {
    return this.http.put(`${URL_API}/productos/${id}`, producto, {
      headers: {
        'x-token': this.token
      }
    });
  }

  eliminarProducto(id) {

    return this.http.delete(`${URL_API}/productos/${id}`, {
      headers: {
        'x-token': this.token
      }
    });

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

  imagen(formdata) {

    return this.http.post(`${URL_API}/upload`, formdata);

  }

  obtenerToken() {
    this.token = localStorage.getItem('token');
  }




}
