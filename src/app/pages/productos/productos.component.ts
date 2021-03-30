import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos = [];

  constructor(private _productosService: ProductoService) {

    this._productosService.obtenerProductos().subscribe((productos: any) => {      

      this.productos = productos['productos'];

    });

   }

  ngOnInit(): void {
  }

}
