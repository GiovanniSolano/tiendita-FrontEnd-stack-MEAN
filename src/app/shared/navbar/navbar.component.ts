import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  titulo = '';
  tituloSubs$: Subscription;
  tituloNav = '';

  constructor(private router: Router,
              public _usuarioService: UsuarioService
              ) {


                


                this.tituloSubs$ = this.getArgumentosRuta()

                .subscribe(({titulo}) => {       
                               
                             
                  this.titulo = titulo;
                  document.title = `Tiendita - ${titulo}`;
                });



  }

  ngOnDestroy() {
    this.tituloSubs$.unsubscribe();
  }

  logout() {

    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }


  getArgumentosRuta() {
    return this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
      );
    
  }

}
