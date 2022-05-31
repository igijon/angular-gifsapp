import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey    : string = '2IVAmabG0xUF1aRwkv7zzJACllhQjUDY';
  private _historial: string[] = [];
  private _servicioUrl: string = 'https://api.giphy.com/v1/gifs'

  public resultados: Gif[] = [];

  get historial() {
    //Como se pasa por referencia, para que no pueda ser modifcado se retorna uno nuevo para romper
    //dicha referencia
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse( localStorage.getItem( 'historial' )! ) || [];
    this.resultados = JSON.parse( localStorage.getItem( 'resultados' )!) || [];

  }

  buscarGifs( query: string = '') {

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes(query) ) {

      this._historial.unshift( query );
      //Limito el historial a 10
      this._historial = this._historial.splice(0,10);

      localStorage.setItem( 'historial', JSON.stringify( this._historial ) );

    }

    const params = new HttpParams()
            .set('api_key', this._apiKey)
            .set('limit', 10)
            .set('q', query);

    this.http.get<SearchGifsResponse>(`${this._servicioUrl}/search`, { params })
          .subscribe( ( resp ) => {
            console.log(resp.data);
            this.resultados = resp.data;
            localStorage.setItem( 'resultados', JSON.stringify( this.resultados ) );
          });
  }
}
