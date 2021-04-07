import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { MensajesInformativosService } from '../../services/mensajes-informativos.service';

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
  proveedores: any = [];
  uploadedFile: File;
  imageSrc = '';
  tiposValidos = false;
  mensajeTipos = '';
  enviarForm = true;
  enviado = false;  


  constructor(private _ActivatedRoute: ActivatedRoute,
              private _productoService: ProductoService,
              private fb: FormBuilder ,
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
      imagen: [''],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      proveedor: ['', Validators.required],
      url_img: ['']
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

      this.proveedores = resp['proveedores']
      // console.log(this.proveedores);
      

    });
  }

  fileChange(event) {
    this.tiposValidos = false;
    const reader = new FileReader();
    const img = event.target.files[0];    

    if(!img) {

      this.mensajeTipos = 'La imagen es requerida';
      this.tiposValidos = true;
      this.enviarForm = true;
      return this.imageSrc = '../../../assets/img/img-icon.png';

    }


    if (!(/\.(jpg|png|gif)$/i).test(img.name)) {
      this.mensajeTipos = 'Los tipos permitidos son: jpg, png, gif';
      this.tiposValidos = true;
      this.enviarForm = true;
      return this.imageSrc = '../../../assets/img/img-icon.png';
  }


    this.enviarForm = false;

    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
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
