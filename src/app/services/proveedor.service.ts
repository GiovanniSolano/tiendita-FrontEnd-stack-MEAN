import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const URL_API = environment.URL_API;

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  token: string;

  constructor(private http: HttpClient) {

    this.obtenerToken();

   }

  obtenerProveedores() {

    return this.http.get(`${URL_API}/proveedores`);

  }

  agregarProveedor(proveedor) {

    return this.http.post(`${URL_API}/proveedores`, proveedor, {
      headers: {
        'x-token': this.token
      }
    });

  }

   editarProveedor(id, proveedor) {

    return this.http.put(`${URL_API}/proveedores/${id}`, proveedor, {
      headers: {
        'x-token': this.token
      }
    });

  }

  obtenerProveedorPorID(id: string) {

    return this.http.get(`${URL_API}/proveedores/${id}`, {
      headers: {
        'x-token': this.token
      }
    });

  }

  eliminarProveedor(id: string) {

    return this.http.delete(`${URL_API}/proveedores/${id}`, {
      headers: {
        'x-token': this.token
      }
    });

  }


  obtenerToken() {
    this.token = localStorage.getItem('token');
  }


  

}
