import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  checked = false;

  recordar = false;

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar) { 
    
    this.loginForm = this.fb.group({

      correo: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]],
      password: ['', Validators.required]


    });

  }

  ngOnInit(): void {




  }


  cambiar() {
    
    this.recordar = (this.recordar) ? false : true;
    console.log(this.recordar);
    
    
  }

  login() {
    
    if(this.loginForm.invalid) {
      this._snackBar.open('Ingresa los datos correctamente', '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      Object.values(this.loginForm.controls).forEach(form => {
  
        form.markAsTouched();
  
      });
      return;
    }
    
  }

  get correoRequerido(): boolean {
    return this.loginForm.get('correo').hasError('required') && this.loginForm.get('correo').touched;
  }
  get passwordRequerido(): boolean {
    return this.loginForm.get('password').hasError('required') && this.loginForm.get('password').touched;
  }

  get correoValido(): boolean {
    return this.loginForm.get('correo').hasError('pattern') && this.loginForm.get('correo').touched;
  }



}
