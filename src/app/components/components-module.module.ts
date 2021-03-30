import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductoComponent } from './card-producto/card-producto.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [CardProductoComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AppRoutingModule
    
  ], exports: [CardProductoComponent]
})
export class ComponentsModuleModule { }
