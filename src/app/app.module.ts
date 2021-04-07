import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/angular-material.module';
import { PagesModuleModule } from './pages/pages-module.module';
import { AuthModuleModule } from './auth/auth-module.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado/no-encontrado.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; 

@NgModule({
  declarations: [
    AppComponent,
    NoEncontradoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularMaterialModule,
    PagesModuleModule,
    AuthModuleModule,
    HttpClientModule,
    RxReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
