import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey    : string = '2IVAmabG0xUF1aRwkv7zzJACllhQjUDY';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    //Como se pasa por referencia, para que no pueda ser modifcado se retorna uno nuevo para romper
    //dicha referencia
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse( localStorage.getItem( 'historial' )! ) || [];

  }

  buscarGifs( query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query) ) {

      this._historial.unshift( query );
      //Limito el historial a 10
      this._historial = this._historial.splice(0,10);

      localStorage.setItem( 'historial', JSON.stringify( this._historial ) );

    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${ this._apiKey }&q=${ query }&limit=10`)
          .subscribe( ( resp ) => {
            console.log(resp.data);
            this.resultados = resp.data;
          });
  }
}
