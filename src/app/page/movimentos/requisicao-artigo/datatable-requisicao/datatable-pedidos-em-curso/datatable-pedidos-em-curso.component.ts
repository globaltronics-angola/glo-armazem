import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-datatable-pedidos-em-curso',
  templateUrl: './datatable-pedidos-em-curso.component.html',
  styles: [
  ]
})
export class DatatablePedidosEmCursoComponent implements OnInit{
  list_items: any[] = []


  ngOnInit() {

  }


  kFormatter(attr : string){
    return attr
  }

  deleteInfo(attr: string){

  }
}
