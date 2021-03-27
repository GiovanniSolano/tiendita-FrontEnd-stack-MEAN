import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  titulo = '';
  tituloSubs$: Subscription;

  constructor(private router: Router) {



    this.tituloSubs$ = this.getArgumentosRuta()
    .subscribe(({titulo}) => {
      this.titulo = titulo;
      document.title = `Tiendita - ${titulo}`;
    });

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
