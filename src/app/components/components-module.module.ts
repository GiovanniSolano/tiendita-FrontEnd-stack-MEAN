import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductoComponent } from './card-producto/card-producto.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { AgregarEditarProveedorModalComponent } from './agregar-editar-proveedor-modal/agregar-editar-proveedor-modal.component';



@NgModule({
  declarations: [CardProductoComponent, AgregarEditarProveedorModalComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule
    
  ], exports: [CardProductoComponent]
})
export class ComponentsModuleModule { }
