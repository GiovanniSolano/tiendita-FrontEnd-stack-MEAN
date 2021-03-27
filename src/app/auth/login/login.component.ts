import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

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
    private _snackBar: MatSnackBar,
    private _usuarioService: UsuarioService,
    private router: Router) { 
    
    this.loginForm = this.fb.group({

      correo: ['giovanni@gmail.com', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]],
      password: ['123456', Validators.required]


    });

  }

  ngOnInit(): void {

    const estaLogueado = this._usuarioService.estaLogueado();

    if(estaLogueado) {
      this.router.navigate(['/']);
    }




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

    this._usuarioService.loginUsuario(this.loginForm.value)
      .subscribe(usuarioBD => {        
        this.guardarEnStorage(usuarioBD['token']);
        this.router.navigate(['/inicio']);
       

      });
    
  }


  guardarEnStorage(token) {
    localStorage.setItem('token', token);
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
