import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { delay } from 'rxjs/operators';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { ProductoService } from '../../services/producto.service';
import { MensajesInformativosService } from '../../services/mensajes-informativos.service';
import { BusquedaService } from '../../services/busqueda.service';

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
    private _mensajeInformativo: MensajesInformativosService,
    private _busquedaService: BusquedaService) {
      


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

   busquedaProductos(termino) {

    if(termino.length === 0) {
      this.cargarProductos();
      return;
    }
    
     
    
    this._busquedaService.busquedaPorColeccion('productos', termino)
      .subscribe(productos => {

        this.productos = productos['resultados'];
        

      });

     
   }

   eliminarProducto(producto) {

    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: `Estás seguro de eliminar el producto: ${producto.nombre}?`,
            titulo: 'Producto'}
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
