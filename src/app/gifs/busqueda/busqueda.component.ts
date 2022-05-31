import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  //Not null assertion operator. Es un operador para asegurar que el objeto nunca será nulo aunque no esté inicializado

  buscar( ) {
    const valor = this.txtBuscar.nativeElement.value;
    console.log(valor);
    this.txtBuscar.nativeElement.value='';
  }

}
