import { Component } from '@angular/core';
import ServiceUtil from "../../../../Services/ServiceUtil";

@Component({
  selector: 'app-formulario-artigos',
  templateUrl: './formulario-artigos.component.html',
  styles: [
  ]
})
export class FormularioArtigosComponent {
  idMovement =  '123232';
  listArticles: any[] = [];
  util: any = ServiceUtil

  constructor() {
    this.idMovement = "woeriowe9383837"
  }


  addListItems(){

  }

  save(){}

  cancelerMovement(){}
}
