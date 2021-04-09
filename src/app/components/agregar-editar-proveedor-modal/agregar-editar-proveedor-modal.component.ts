import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { MensajesInformativosService } from '../../services/mensajes-informativos.service';

@Component({
  selector: 'app-agregar-editar-proveedor-modal',
  templateUrl: './agregar-editar-proveedor-modal.component.html',
  styleUrls: ['./agregar-editar-proveedor-modal.component.css']
})
export class AgregarEditarProveedorModalComponent implements OnInit {


  mensaje: string;
  proveedorForm: FormGroup;
  btn = 'aceptar';
  id_proveedor: string;
  accion = 'Agregar';


  constructor( public dialogRef: MatDialogRef<AgregarEditarProveedorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
     private _mensajesInformativos: MensajesInformativosService,
     private fb: FormBuilder,
     private _proveedorService: ProveedorService) {
      this.mensaje = data.mensaje;
      this.id_proveedor = data.id_proveedor;

      this.proveedorForm = this.fb.group({

        nombre: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)]],
        direccion: ['',]


      });


     }



  ngOnInit(): void {
    

    if(this.id_proveedor !== undefined) {
      this.accion = 'Editar';
      this.esEditar();
      
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  esEditar() {


    this._proveedorService.obtenerProveedorPorID(this.id_proveedor)
      .subscribe(resp => {

        const proveedor = resp['proveedorBD'];

        this.proveedorForm.patchValue({
          nombre: proveedor.nombre,
          telefono: proveedor.telefono
        });

      }, (error) => {
        console.log(error);
        
        this._mensajesInformativos.mostrarMensaje(error.error.msg);

      });



  }

  agregarProveedor() {

    if(this.proveedorForm.invalid) {


      return;
    }

    if(this.id_proveedor !== undefined) {

      this._proveedorService.editarProveedor(this.id_proveedor, this.proveedorForm.value)
        .subscribe(resp => {

          this._mensajesInformativos.mostrarMensaje('Proveedor editado correctamente');


        }, (error) => {
          console.log(error);
          
          this._mensajesInformativos.mostrarMensaje(error.error.msg);
  
        });

    } else {

      this._proveedorService.agregarProveedor(this.proveedorForm.value)
        .subscribe(resp => {
  
          this._mensajesInformativos.mostrarMensaje('Proveedor agregado correctamente');
  
        }, (error) => {
          console.log(error);
          
          this._mensajesInformativos.mostrarMensaje(error.error.msg);
  
        });
    }
  }

  
  get nombreRequerido(): boolean {
    return this.proveedorForm.get('nombre').hasError('required') && this.proveedorForm.get('nombre').touched;
  }

  get telefonoRequerido(): boolean {
    return this.proveedorForm.get('telefono').hasError('required') && this.proveedorForm.get('telefono').touched;
  }
  get telefonoValido(): boolean {
    return this.proveedorForm.get('telefono').hasError('pattern') && this.proveedorForm.get('telefono').touched;
  }

  


}
