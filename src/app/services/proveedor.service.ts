import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const URL_API = environment.URL_API;

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  obtenerProveedores() {

    return this.http.get(`${URL_API}/proveedores`);

  }

  

}
