import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StorageService} from "../../../../shared/storage.service";
import ServiceUtil from "../../../../Services/ServiceUtil";
import {ServiceEmitter} from "../../../../Services/ServiceEmitter";


@Component({
  selector: 'app-tabela-item-entrada',
  templateUrl: './tabela-item-entrada.component.html',
  styles: []
})
export class TabelaItemEntradaComponent implements OnInit {

  listItems: any[] = []

  constructor(private store: StorageService) {


  }

  ngOnInit(): void {
    this.findAllItemTemporal()

  }


  findAllItemTemporal() {

  }

  kFormatter(num: number) {
    // @ts-ignore
    return num;//Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  }

  deleteInfo(attr: any) {
    this.store.deleted(ServiceUtil.STORAGE_ITEM_MOVIMENTO, attr).then(
      () => {
        (<any>window).sentMessageSuccess.init('Foi eliminado com sucesso obrigado!')
      }, err => {

      }
    )
  }


  emitFunctionalityUp(attr: any) {

    ServiceEmitter.get('sendItemsMovimento').emit(attr)
  }

}
