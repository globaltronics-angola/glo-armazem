import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import ServiceMovimento from "../../../../Services/ServiceMovimento";
import { StorageService } from "../../../../shared/storage.service";
import ServiceUtil from "../../../../Services/ServiceUtil";
import moment from 'moment';


import jsPDF from 'jspdf';

import { writeFileSync } from 'node:fs';
import { format } from 'node:util';


@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styles: []
})
export class LancamentoComponent implements OnInit {

  @ViewChild("tableEntered", { static: true }) tablePdf!: ElementRef;

  listMove: any[] = []
  window = (<any>window)


  constructor(private store: StorageService) {


  }

  generatePdf(attr: any) { }

  makeJSPdf(attr: any) {

    let pdf = new jsPDF('p', 'pt', 'a4');

    pdf.html(
      '<h1>Hello Munzambi Miguel</h1>',
      {
        callback: (pdf) => {
          pdf.save("Relatorio De Entrada");
        }
      });

    }

  filesystem(attr: any) {

    // writeFileSync('message.text', `${format(attr)}\n`, { flag: 'a' });

  }


  async ngOnInit() {
    this.listMove = await new ServiceMovimento(this.store).findMovType();

    this.initTable()

  }

  somarGeral(dataArry: any) {

    console.log(dataArry)
  }


  deleteMovementAndItems(attr: string) {

  }


  convertJson(data: any) {
    if (data)
      return JSON.parse(data.toString());

    return {};
  }



  initTable() {


    try {
      let table = document.querySelector('#kt_customers_table');
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

    }

  }



}
