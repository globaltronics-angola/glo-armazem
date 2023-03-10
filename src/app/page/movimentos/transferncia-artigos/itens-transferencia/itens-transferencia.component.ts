import {Component} from '@angular/core';
import ServiceUtil from "../../../../Services/ServiceUtil";
import {Subscription} from "rxjs";
import {StorageService} from "../../../../shared/storage.service";
import {ServiceEmitter} from "../../../../Services/ServiceEmitter";
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";

@Component({
  selector: 'app-itens-transferencia',
  templateUrl: './itens-transferencia.component.html',
  styles: []
})
export class ItensTransferenciaComponent {
  list_items: any[] = []
  utilFunctions: ServiceUtil
  skow: Subscription;

  constructor(private store: StorageService) {
    this.utilFunctions = new ServiceUtil();
    this.findAllItemTemporal()
    this.skow = ServiceEmitter.get('actionSendMovimento').subscribe(() => this.list_items = new ServiceMovimentoItems(this.store).findInputMovNull("TRANSFER"))
  }

  ngOnInit(): void {
  }

  findAllItemTemporal() {
    this.list_items = new ServiceMovimentoItems(this.store).findInputMovNull("TRANSFER")
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
    ServiceEmitter.get('sendItemsMovimentoTransfer').emit(attr)
  }
}
