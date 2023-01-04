import {Component, OnInit} from '@angular/core';
import ServiceMovimentoItems from 'src/app/Services/ServiceMovimentoItems';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-datatable-pedidos-em-curso',
  templateUrl: './datatable-pedidos-em-curso.component.html',
  styles: [
  ]
})
export class DatatablePedidosEmCursoComponent implements OnInit{
  list_items: any[] = []

  constructor(private store: StorageService){ }


  ngOnInit() {
    this.findAllItemTemporal()
  }


  kFormatter(attr : string){
    return attr
  }

  deleteInfo(attr: string){

  }

  findAllItemTemporal() {

    this.list_items = new ServiceMovimentoItems(this.store).findInputMovNull("OUTPUT")

  }
}
