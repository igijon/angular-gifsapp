import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  //Not null assertion operator. Es un operador para asegurar que el objeto nunca será nulo aunque no esté inicializado

  constructor(private gifsService: GifsService){}

  buscar( ) {
    const valor = this.txtBuscar.nativeElement.value;

    if ( valor.trim().length === 0 ) return;
    
    this.gifsService.buscarGifs( valor );
    this.txtBuscar.nativeElement.value='';
  }

}
