import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { AgregarEditarProductoComponent } from './agregar-editar-producto/agregar-editar-producto.component';

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
    {
        path: 'agregar-producto',
        component: AgregarEditarProductoComponent,
        data: {titulo: 'Agregar Producto'}
    },
    {
        path: 'editar-producto/:id',
        component: AgregarEditarProductoComponent,
        data: {titulo: 'Editar Producto'}
    }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildPagesRoutingModule { }
