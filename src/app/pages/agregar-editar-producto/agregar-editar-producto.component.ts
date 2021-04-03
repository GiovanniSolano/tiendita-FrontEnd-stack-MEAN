import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { MensajesInformativosService } from '../../services/mensajes-informativos.service';

@Component({
  selector: 'app-agregar-editar-producto',
  templateUrl: './agregar-editar-producto.component.html',
  styleUrls: ['./agregar-editar-producto.component.css']
})
export class AgregarEditarProductoComponent implements OnInit {

  id: string;
  titulo: string;
  productoForm: FormGroup;
  proveedores: any = [];

  constructor(private _ActivatedRoute: ActivatedRoute,
              private _productoService: ProductoService,
              private fb: FormBuilder,
              private _proveedoresService: ProveedorService,
              private _mensajeInformativo: MensajesInformativosService,
              private router: Router) {

    this.titulo = 'Agregar';
    this.id = this._ActivatedRoute.snapshot.params['id'];

    this.obtenerProveedoresBD();
  
    this.productoForm = this.fb.group({

      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      proveedor: ['', Validators.required]

    });

  


   }

  ngOnInit(): void {

    if(this.id !== undefined) {

      this.titulo = 'Editar';
      this.esEditar();
      
    }


    

  }

  obtenerProveedoresBD() {
    this._proveedoresService.obtenerProveedores().subscribe(resp => {

      this.proveedores = resp['proveedores']
      console.log(this.proveedores);
      

    });
  }

  agregarEditarProducto() {
    if(this.productoForm.invalid) {

      this._mensajeInformativo.mostrarMensaje('Ingresa tus datos correctamente');

      Object.values(this.productoForm.controls).forEach(control => {

        control.markAsTouched();

      });

      return;
      
    }

    if(this.id !== undefined) {

      this._productoService.editarProducto(this.id, this.productoForm.value)
        .subscribe(resp => {

          this.router.navigate(['/inicio']);
          this._mensajeInformativo.mostrarMensaje('Producto editado correctamente');


        }, (error) => {

          this._mensajeInformativo.mostrarMensaje(error.error.msg);

          
        });   



    } else {

      this._productoService.agregarProducto(this.productoForm.value)
        .subscribe(resp => {

          this.router.navigate(['/inicio']);
          this._mensajeInformativo.mostrarMensaje('Producto agregado correctamente');
          
        }, (error) => {

          this._mensajeInformativo.mostrarMensaje(error.error.msg);

          
        });

    }
    
  }

  esEditar() {

      this._productoService.obtenerProductoPorID(this.id)
        .subscribe(resp => {          

          const producto: any = resp['productoBD'];

          this.productoForm.patchValue({
            nombre: producto.nombre,
            marca: producto.marca,
            descripcion: producto.descripcion,
            precio: producto.precio,
            cantidad: producto.cantidad,
            proveedor: producto.proveedor
        });


    });

  }


  get nombreRequerido(): boolean {
    return this.productoForm.get('nombre').invalid && this.productoForm.get('nombre').touched;
  }

  get marcaRequerida(): boolean {
    return this.productoForm.get('marca').invalid && this.productoForm.get('marca').touched;
  }

  get descripcionRequerida(): boolean {
    return this.productoForm.get('descripcion').invalid && this.productoForm.get('descripcion').touched;
  }

  get precioRequerido(): boolean {
    return this.productoForm.get('precio').invalid && this.productoForm.get('precio').touched;
  }

  get cantidadRequerida(): boolean {
    return this.productoForm.get('cantidad').invalid && this.productoForm.get('cantidad').touched;
  }

  get proveedorRequerido(): boolean {
    return this.productoForm.get('proveedor').invalid && this.productoForm.get('proveedor').touched;
  }

}
