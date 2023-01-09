import {Component} from '@angular/core';
import ServiceUtil from "../../../../Services/ServiceUtil";

@Component({
  selector: 'app-formulario-devolucao',
  templateUrl: './formulario-devolucao.component.html',
  styles: []
})
export class FormularioDevolucaoComponent {

  listArticles: any[] = [];
  util: any = ServiceUtil;

  save() {
  }

  cancelerMovement() {
  }

  addListItems(){}
}
