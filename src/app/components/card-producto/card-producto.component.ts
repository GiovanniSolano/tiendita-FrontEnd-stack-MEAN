import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-producto',
  templateUrl: './card-producto.component.html',
  styleUrls: ['./card-producto.component.css']
})
export class CardProductoComponent implements OnInit {

  @Input() producto;
  @Output() $productoEliminar = new EventEmitter<any>();

  clase = false;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {



  }
  
  

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.

    let elminarElement = this.el.nativeElement.querySelector('.delete');

    if(elminarElement.classList.contains('cdk-program-focused')){      
    elminarElement.classList.remove('cdk-program-focused'); 
  }
    
  }

  eliminarProducto(producto){


    this.$productoEliminar.emit(producto);

  }

}
