import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { ProductosComponent } from './productos/productos.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { PagesRoutingModule } from './pages.routing';
import { AgregarEditarProductoComponent } from './agregar-editar-producto/agregar-editar-producto.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModuleModule } from '../components/components-module.module';



@NgModule({
  declarations: [PagesComponent, ProductosComponent, AgregarEditarProductoComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PagesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentsModuleModule
  ],
  exports: []
})
export class PagesModuleModule { }
