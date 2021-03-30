import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';

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
              private _proveedoresService: ProveedorService) {

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
    if(this.productoForm.valid) {
      this._productoService.agregarProducto(this.productoForm.value)
        .subscribe(resp => {
          console.log(resp);
          
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

}
