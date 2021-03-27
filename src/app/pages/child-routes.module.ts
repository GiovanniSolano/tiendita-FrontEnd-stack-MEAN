import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [

    {
        path: '',
        redirectTo: 'productos'
    },
    {
        path: 'productos',
        component: ProductosComponent,
        data: {titulo: 'Productos'}
    },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildPagesRoutingModule { }
