import {Component} from '@angular/core';
import ServiceUtil from "../../../../../Services/ServiceUtil";
import {Subscription} from "rxjs";
import {StorageService} from "../../../../../shared/storage.service";
import {ServiceEmitter} from "../../../../../Services/ServiceEmitter";
import ServiceMovimentoItems from "../../../../../Services/ServiceMovimentoItems";

@Component({
  selector: 'app-item-inventario',
  templateUrl: './item-inventario.component.html',
  styles: []
})
export class ItemInventarioComponent {
  listItems: any[] = []
  utilFunctions: ServiceUtil
  skow: Subscription;
  private moveType: string = "INVENTORY"

  constructor(private store: StorageService) {
    this.utilFunctions = new ServiceUtil();
    this.findAllItemTemporal();
    this.skow = ServiceEmitter.get('actionSendMovimento').subscribe(() => this.listItems = new ServiceMovimentoItems(this.store).findInputMovNull(this.moveType))

  }

  ngOnInit(): void {
  }


  findAllItemTemporal() {

    this.listItems = new ServiceMovimentoItems(this.store).findInputMovNull(this.moveType)

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

  emitFunctionalityUp(attr: any) {
    ServiceEmitter.get('sendItemsMovimentoDevolution').emit(attr)
  }

}
