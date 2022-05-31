import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey    : string = '2IVAmabG0xUF1aRwkv7zzJACllhQjUDY';
  private _historial: string[] = [];

  get historial() {
    //Como se pasa por referencia, para que no pueda ser modifcado se retorna uno nuevo para romper
    //dicha referencia
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {}

  buscarGifs( query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query) ) {

      this._historial.unshift( query );
      //Limito el historial a 10
      this._historial = this._historial.splice(0,10);

    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${query}`)
          .subscribe( (resp:any) => {
            console.log(resp.data);
          });
  }
}
