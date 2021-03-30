import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensajesInformativosService {

  constructor(private _snackBar: MatSnackBar) { }


  mostrarMensaje(mensaje: string) {
    this._snackBar.open(mensaje, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

}
