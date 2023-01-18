import {Component, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ArticlesSelectSearcheComponent {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get('hello munzambi')
  }

}
