import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

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
