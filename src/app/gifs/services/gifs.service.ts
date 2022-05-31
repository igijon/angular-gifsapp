import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial() {
    //Como se pasa por referencia, para que no pueda ser modifcado se retorna uno nuevo para romper
    //dicha referencia
    return [...this._historial];
  }

  buscarGifs( query: string ) {
    this._historial.unshift( query );
    console.log(this._historial);

  }
}
