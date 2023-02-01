import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {StorageService} from "../../../../shared/storage.service";
import ServiceUtil from "../../../../Services/ServiceUtil";
import {ServiceEmitter} from "../../../../Services/ServiceEmitter";
import ServiceMovimentoItems from 'src/app/Services/ServiceMovimentoItems';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-tabela-item-entrada',
  templateUrl: './tabela-item-entrada.component.html',
  styles: []
})
export class TabelaItemEntradaComponent implements OnInit, OnDestroy {

  listItems: any[] = []
  private window = (<any>window)
  skow: Subscription;

  constructor(private store: StorageService) {
    this.findAllItemTemporal()
    this.skow = ServiceEmitter.get('actionSendMovimentoEntrada').subscribe(() => this.listItems = new ServiceMovimentoItems(this.store).findInputMovNull())

  }

  ngOnDestroy(): void {
    this.skow.unsubscribe()
  }

  ngOnInit(): void {
  }

  findAllItemTemporal() {

    this.listItems = new ServiceMovimentoItems(this.store).findInputMovNull()
  }

  kFormatter(num: number) {
    // @ts-ignore
    return num;

    //Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  }

  deleteInfo(attr: any) {
    let itemMo = new ServiceMovimentoItems(this.store);
    itemMo.oItem = attr;
    itemMo.delete();
    this.listItems = new ServiceMovimentoItems(this.store).findInputMovNull()
  }

  emitFunctionalityUp(attr: any) {
    ServiceEmitter.get('sendItemsMovimento').emit(attr)
  }

  convertJson(attr: any) {
    try {
      return JSON.parse(attr.toString())
    } catch (e) {
      return {}
    }
  }

}
