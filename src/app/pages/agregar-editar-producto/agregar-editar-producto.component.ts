import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { MensajesInformativosService } from '../../services/mensajes-informativos.service';
import { AgregarEditarProveedorModalComponent } from '../../components/agregar-editar-proveedor-modal/agregar-editar-proveedor-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-agregar-editar-producto',
  templateUrl: './agregar-editar-producto.component.html',
  styleUrls: ['./agregar-editar-producto.component.css',
  
]
})
export class AgregarEditarProductoComponent implements OnInit {

  id: string;
  titulo: string;
  productoForm: FormGroup;
  proveedores: any[] = [];
  uploadedFile: File;
  imageSrc = '';
  tiposValidos = false;
  mensajeTipos = '';
  enviarForm = true;
  enviado = false;  
  proveedor_id: string;


  constructor(private _ActivatedRoute: ActivatedRoute,
              private _productoService: ProductoService,
              private fb: FormBuilder ,
              public dialog: MatDialog,
              private el: ElementRef,
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
      img_id: [''],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      proveedor: ['', Validators.required],
      url_img: ['']
    });    
  }
  
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    
    let eliminarElement = this.el.nativeElement.querySelectorAll('.delete');
    
    eliminarElement.forEach(function(element) {      
      if(element.classList.contains('cdk-program-focused')) {
        element.classList.remove('cdk-program-focused'); 
      }
    });      
    
  }

  ngOnInit(): void {

    if(this.id !== undefined) {

      this.titulo = 'Editar';
      this.esEditar();
      
    } else {
      this.imageSrc = '../../../assets/img/img-icon.png';
    }
    


  }



  obtenerProveedoresBD() {
    this._proveedoresService.obtenerProveedores().subscribe(resp => {
      
      this.proveedores = resp['proveedores'];
      // console.log(this.proveedores);
      

    }, (error) => {

      this._mensajeInformativo.mostrarMensaje(error.error.msg);

      
    });
  }

  fileChange(event) {

    if(event === null) {

      this.mensajeTipos = 'La imagen es requerida';
      this.tiposValidos = true;
      this.enviarForm = true;
      return this.imageSrc = '../../../assets/img/img-icon.png';
  }
    
    this.tiposValidos = false;
    const reader = new FileReader();
    const img = event[0];    

    if(!img) {

      this.mensajeTipos = 'La imagen es requerida';
      this.tiposValidos = true;
      this.enviarForm = true;
      return this.imageSrc = '../../../assets/img/img-icon.png';

    }


    if (!(/\.(jpg|png|jpeg)$/i).test(img.name)) {
      this.mensajeTipos = 'Los tipos permitidos son: jpg, jpeg, png';
      this.tiposValidos = true;
      this.enviarForm = true;
      return this.imageSrc = '../../../assets/img/img-icon.png';
  }


    this.enviarForm = false;

    
    if(event && event.length) {
      const [file] = event;
      this.uploadedFile = file;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;

   
      };
   
    }

  }

  agregarEditarProducto() {

    this.enviado = true;


    if(this.productoForm.invalid) {

      this._mensajeInformativo.mostrarMensaje('Ingresa tus datos correctamente');

      Object.values(this.productoForm.controls).forEach(control => {

        control.markAsTouched();

      });

      return;
      
    }

    if(this.id !== undefined) {

      
      let formData = new FormData();

      this.formDataBackEnd(formData);

      this._productoService.editarProducto(this.id, formData)
        .subscribe(resp => {

          this.router.navigate(['/inicio']);
          this._mensajeInformativo.mostrarMensaje('Producto editado correctamente');


        }, (error) => {

          this._mensajeInformativo.mostrarMensaje(error.error.msg);

          
        });   



    } else {

      let formData = new FormData();

      this.formDataBackEnd(formData);


      this._productoService.agregarProducto(formData)
        .subscribe(resp => {

          this.router.navigate(['/inicio']);
          this._mensajeInformativo.mostrarMensaje('Producto agregado correctamente');
          
        }, (error) => {

          this._mensajeInformativo.mostrarMensaje(error.error.msg);

          
        });

    }
    
  }

  formDataBackEnd(formData: FormData) {
    formData.append("imagen", this.uploadedFile);

    formData.append('nombre', this.productoForm.get('nombre').value);
    formData.append('marca', this.productoForm.get('marca').value);
    formData.append('descripcion', this.productoForm.get('descripcion').value);
    formData.append('precio', this.productoForm.get('precio').value);
    formData.append('cantidad', this.productoForm.get('cantidad').value);
    formData.append('img_id', this.productoForm.get('img_id').value);
    formData.append('proveedor', this.productoForm.get('proveedor').value);

  }

  esEditar() {

      this._productoService.obtenerProductoPorID(this.id)
        .subscribe(resp => {          

          const producto: any = resp['productoBD'];
          this.imageSrc = producto.url_img;
          this.proveedor_id = producto.proveedor;
          this.enviarForm = false;          

          

          this.productoForm.patchValue({
            nombre: producto.nombre,
            marca: producto.marca,
            img_id: producto.img_id, 
            descripcion: producto.descripcion,
            precio: producto.precio,
            cantidad: producto.cantidad,
            proveedor: producto.proveedor,
            url_img: producto.url_img

        });


    }, (error) => {      
      

      let mensaje = '';
      mensaje = error.error.msg || error.error.errores.id.msg;      
      this._mensajeInformativo.mostrarMensaje(mensaje);
      this.router.navigate(['/inicio']);
      
    });

  }


  agregarProveedor() {
    const dialogRef = this.dialog.open(AgregarEditarProveedorModalComponent, {
      width: '350px',
      data: {mensaje: 'Agregar Proveedor'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar') {
        this.obtenerProveedoresBD();
      };
    });
  }

  editarProveedor() {
    const proveedor_id = this.productoForm.get('proveedor').value;


    const existeProveedor = this.proveedores.filter(proveedor => proveedor._id === proveedor_id);

    if(existeProveedor.length === 0) {

      return this._mensajeInformativo.mostrarMensaje('No se puede editar algo que no existe');
    

    }    

    const dialogRef = this.dialog.open(AgregarEditarProveedorModalComponent, {
      width: '350px',
      data: {mensaje: 'Editar Proveedor', id_proveedor: proveedor_id}
    });

    dialogRef.afterClosed().subscribe(result => {      
      if(result === 'aceptar') {        
        this.obtenerProveedoresBD();

      };
    });



  }


  eliminarProveedor() {
    const proveedor_id = this.productoForm.get('proveedor').value;
    const existeProveedor = this.proveedores.filter(proveedor => proveedor._id === proveedor_id);

    if(existeProveedor.length === 0) {

      return this._mensajeInformativo.mostrarMensaje('No se puede eliminar algo que no existe');
    

    }   

    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: `Estás seguro de eliminar al proveedor?`, 
              titulo: 'Proveedor'}
    });

    
    dialogRef.afterClosed().subscribe(result => {

      if(result === 'aceptar') {

        this._proveedoresService.eliminarProveedor(proveedor_id)
          .subscribe(resp => {

            this.obtenerProveedoresBD();
            this.productoForm.patchValue({
              proveedor: this.proveedor_id
            });
            this._mensajeInformativo.mostrarMensaje('Proveedor eliminado');

          }, (error) => {


            this._mensajeInformativo.mostrarMensaje(error.error.msg);


          });

      }  
    });
    
  }
  


  get nombreRequerido(): boolean {
    return this.productoForm.get('nombre').invalid && this.productoForm.get('nombre').touched;
  }
  // get imagenRequerida(): boolean {
  //   return this.productoForm.get('imagen').hasError('required') && this.productoForm.get('imagen').touched;
  // }
  // get imagenValida(): boolean {
  //   return (this.productoForm.get('imagen').invalid && this.imagenRequerida) && this.productoForm.get('imagen').touched;
  // }

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
