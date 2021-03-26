import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core/datetime';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  hide = true;

  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {


    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^((\\+91-?)|0)?[0-9]{10}$/)]],
      correo: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

   }

  ngOnInit(): void {

  }

  registro() {
    
    if(this.registroForm.invalid) {
      this._snackBar.open('Ingresa los datos correctamente', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      Object.values(this.registroForm.controls).forEach(form =>{
        form.markAsTouched();
      });

      return;

    }



    
  }


  get nombreRequerido(): boolean {
    return this.registroForm.get('nombre').hasError('required') && this.registroForm.get('nombre').touched;
  }
  get nombreValido(): boolean {
    return this.registroForm.get('nombre').hasError('minlength') && this.registroForm.get('nombre').touched;
  }
  get fechaRequerida(): boolean {
    return this.registroForm.get('fechaNacimiento').hasError('required') && this.registroForm.get('fechaNacimiento').touched;
  }
  get telefonoRequerido(): boolean {
    return this.registroForm.get('telefono').hasError('required') && this.registroForm.get('telefono').touched;
  }
  get telefonoValido(): boolean {
    return this.registroForm.get('telefono').hasError('pattern') && this.registroForm.get('telefono').touched;
  }
  get passwordRequerido(): boolean {
    return this.registroForm.get('password').hasError('required') && this.registroForm.get('password').touched;
  }
  get passwordValido(): boolean {
    return this.registroForm.get('password').hasError('minlength') && this.registroForm.get('password').touched;
  }
  get correoRequerido(): boolean {
    return this.registroForm.get('correo').hasError('required') && this.registroForm.get('correo').touched;
  }
  get correoValido(): boolean {
    return this.registroForm.get('correo').hasError('pattern') && this.registroForm.get('correo').touched;
  }

}
