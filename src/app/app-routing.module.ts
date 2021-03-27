import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado/no-encontrado.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [

  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: '**', component: NoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  PagesRoutingModule,
  AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
