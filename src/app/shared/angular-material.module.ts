import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';  
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FooterComponent } from './footer/footer.component';
import {MatSelectModule} from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSelectModule,
    FlexLayoutModule
  ],

  exports: [
    MatToolbarModule,
    MatIconModule,
    NavbarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTooltipModule,
    FooterComponent,
    MatSelectModule,
    FlexLayoutModule
  ]
})
export class AngularMaterialModule { }
