import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../../shared/storage.service";
import ServiceUtil from "../../../../Services/ServiceUtil";
import ServiceCountry from "../../../../Services/ServiceCountry";
import {ServiceEmitter} from "../../../../Services/ServiceEmitter";

@Component({
  selector: 'app-item-requisicao',
  templateUrl: './item-requisicao.component.html',
  styles: []
})
export class ItemRequisicaoComponent implements OnInit {

  list_items: any[] = []

  constructor(private store: StorageService) {
  }

  ngOnInit(): void {
    this.findAllItem()

  }


  findAllItem() {


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

  clickedBtnEdit(attr: any){
    ServiceEmitter.get('sendItemsMovimentoSaida').emit(attr)
  }

}
