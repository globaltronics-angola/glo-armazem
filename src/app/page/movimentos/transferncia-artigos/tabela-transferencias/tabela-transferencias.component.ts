import {Component} from '@angular/core';
import ServiceUtil from "../../../../Services/ServiceUtil";
import {StorageService} from "../../../../shared/storage.service";
import {AuthService} from "../../../../shared/auth.service";
import ServiceMovimento from "../../../../Services/ServiceMovimento";
import ServicePrintMove from "../../../../Services/ServicePrintMove";


@Component({
  selector: 'app-tabela-transferencias',
  templateUrl: './tabela-transferencias.component.html',
  styles: []
})
export class TabelaTransferenciasComponent {
  listMove: any[] = []
  utilFunctions: ServiceUtil;

  user: any = {}


  constructor(private store: StorageService, private auth: AuthService, private printer: ServicePrintMove) {
    this.utilFunctions = new ServiceUtil()
    this.user = auth.user;
  }

  async ngOnInit() {

    this.listMove = await new ServiceMovimento(this.store).findMovType("TRANSFER");
    this.initDataTable()
  }


  kFormatter(attr: string) {
    return attr
  }

  deleteInfo(attr: string) {

  }

  deleteMovementAndItems(attr: any) {
  }


  initDataTable() {


  }

  printMov(attr: any) {
    let move: ServiceMovimento = new ServiceMovimento(this.store)
    move.oItem = attr
    this.printer.printFunctionsTransfer(move.oItem.items, move);
  }
}
