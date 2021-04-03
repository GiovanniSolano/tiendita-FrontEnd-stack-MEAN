import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { delay } from 'rxjs/operators';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { ProductoService } from '../../services/producto.service';
import { MensajesInformativosService } from '../../services/mensajes-informativos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  productos = [];
  cargando = false;

  constructor(private _productosService: ProductoService,
    public dialog: MatDialog,
    private _mensajeInformativo: MensajesInformativosService) {


    this.cargarProductos();

   }

   cargarProductos() {
     this.cargando = true;
    this._productosService.obtenerProductos()
    .pipe(delay(300))
    .subscribe((productos: any) => {   
      
      this.cargando = false;

      this.productos = productos['productos'];

    });
   }

   eliminarProducto(producto) {

    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: `Estás seguro de eliminar el producto: ${producto.nombre}?`}
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result === 'aceptar') {
        this._productosService.eliminarProducto(producto._id)
          .subscribe(resp => {
  
            this.cargarProductos();
            this._mensajeInformativo.mostrarMensaje('Producto eliminado correctamente');
  
          }, (error) => {

            this._mensajeInformativo.mostrarMensaje(error.error.msg);


          });
      }  
    });
}

}
