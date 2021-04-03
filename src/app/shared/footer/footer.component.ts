import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  anio: number;
  fechaHoy = new Date();
  constructor() {

    this.anio = this.fechaHoy.getFullYear();

   }

  ngOnInit(): void {
  }

}
