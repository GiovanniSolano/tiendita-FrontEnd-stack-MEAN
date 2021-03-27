import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { ProductosComponent } from './productos/productos.component';
import { AngularMaterialModule } from '../shared/angular-material.module';



@NgModule({
  declarations: [PagesComponent, ProductosComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: []
})
export class PagesModuleModule { }
