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

  buscarGifs( query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query) ) {

      this._historial.unshift( query );
      //Limito el historial a 10
      this._historial = this._historial.splice(0,10);

    }

  }
}
