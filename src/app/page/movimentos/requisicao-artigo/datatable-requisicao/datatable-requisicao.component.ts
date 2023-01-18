import { Component, OnInit } from '@angular/core';
import ServiceMovimento from 'src/app/Services/ServiceMovimento';
import ServiceUtil from 'src/app/Services/ServiceUtil';
import { StorageService } from 'src/app/shared/storage.service';
//@ts-ignore
import pdfMake from "pdfmake/build/pdfmake";
import { AuthService } from 'src/app/shared/auth.service';
import ServicePrintMove from "../../../../Services/ServicePrintMove";

@Component({
  selector: 'app-datatable-requisicao',
  templateUrl: './datatable-requisicao.component.html',
  styles: []
})
export class DatatableRequisicaoComponent implements OnInit {

  listMove: any[] = []
  utilFunctions: ServiceUtil;

  user: any = {}
  momentFormat: any;
  constructor(private store: StorageService, private auth: AuthService, private printer:ServicePrintMove) {
    this.utilFunctions = new ServiceUtil()
    this.user =  auth.user;
  }

  async ngOnInit() {

    this.listMove = await new ServiceMovimento(this.store).findMovType("OUTPUT");
    this.initDataTable()
  }


  kFormatter(attr: string) {
    return attr
  }

  deleteInfo(attr: string) {

  }

  initDataTable() {

   /* try {
      let table = document.querySelector('#kt_customers_tableOut');
      //@ts-ignore
      datatable = $(table).DataTable({
        "info": false,
        'order': [],
        'columnDefs': [
          { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
          { orderable: false, targets: 6 }, // Disable ordering on column 6 (actions)
        ]
      });
    } catch (e: any) {

    }*/

  }


  deleteMove(mov: any) {

  }

  printMov(attr: any) {
    let move: ServiceMovimento = new ServiceMovimento(this.store)
    move.oItem = attr
    this.printer.printFunctionsRequisition(move.oItem.items, move);
  }

  pdfGenerator() {

  }
}
