import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    
  constructor(private _router: Router,
    private _usuarioService: UsuarioService) {}

  canActivate() {

      return this._usuarioService.validarToken()
        .pipe(tap(estaAutenticado => {
          
          if(!estaAutenticado) {
            this._router.navigate(['/login']);
          }
          
        }))

  }

  
  
}
