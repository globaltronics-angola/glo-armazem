import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../../shared/storage.service";
import ServiceUtil from "../../../../Services/ServiceUtil";
import ServiceCountry from "../../../../Services/ServiceCountry";
import { ServiceEmitter } from "../../../../Services/ServiceEmitter";
import ServiceMovimentoItems from 'src/app/Services/ServiceMovimentoItems';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-requisicao',
  templateUrl: './item-requisicao.component.html',
  styles: []
})
export class ItemRequisicaoComponent implements OnInit {

  list_items: any[] = []
  utilFunctions: ServiceUtil
  skow: Subscription;

  constructor(private store: StorageService) {
    this.utilFunctions = new ServiceUtil();
    this.findAllItemTemporal()
    this.skow = ServiceEmitter.get('actionSendMovimento').subscribe(() => this.list_items = new ServiceMovimentoItems(this.store).findInputMovNull("OUTPUT"))

  }

  ngOnInit(): void { }


  findAllItemTemporal() {

    this.list_items = new ServiceMovimentoItems(this.store).findInputMovNull("OUTPUT")

  }

  kFormatter(num: number) {
    // @ts-ignore
    return num;//Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  }

  deleteInfo(attr: any) {
    let sItem = new ServiceMovimentoItems(this.store);
    sItem.oItem = attr;
    sItem.delete()

    this.findAllItemTemporal()
  }

  clickedBtnEdit(attr: any) {
    ServiceEmitter.get('sendItemsMovimentoSaida').emit(attr)
  }

}
