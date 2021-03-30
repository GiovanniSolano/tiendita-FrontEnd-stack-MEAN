import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { MensajesInformativosService } from '../../services/mensajes-informativos.service';

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
    private _usuarioService: UsuarioService,
    private router: Router,
    private _mensajesService: MensajesInformativosService) { 
    
    this.loginForm = this.fb.group({

      correo: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]],
      password: ['', Validators.required]


    });

  }

  ngOnInit(): void {

    const estaLogueado = this._usuarioService.estaLogueado();

    if(estaLogueado) {
      this.router.navigate(['/inicio']);
    }


    const recordarUsuario = localStorage.getItem('recordar') || '';

    if(recordarUsuario.length > 0) {
      this.recordar = true;
      this.loginForm.patchValue({
        correo: recordarUsuario
      });
    }

  }


  cambiar() {
  
    this.recordar = (this.recordar) ? false : true;    
    
    
  }

  login() {
    
    if(this.loginForm.invalid) {

      this._mensajesService.mostrarMensaje('Ingresa correctamente tus datos');


      Object.values(this.loginForm.controls).forEach(form => {
  
        form.markAsTouched();
  
      });
      return;
    }

    this._usuarioService.loginUsuario(this.loginForm.value)
      .subscribe(usuarioBD => {        

        
        this._usuarioService.guardarEnStorage('token', usuarioBD['token']);

        if(this.recordar) {
          this._usuarioService.guardarEnStorage('recordar', this.loginForm.get('correo').value);
        } else {
          localStorage.removeItem('recordar');

        }

        this.router.navigate(['/inicio']);
       

      }, (error) => {        

        this._mensajesService.mostrarMensaje(error.error.msg);

      });
    
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
