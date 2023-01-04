import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import ServiceMovimento from "../../../../Services/ServiceMovimento";
import { StorageService } from "../../../../shared/storage.service";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styles: []
})
export class LancamentoComponent implements OnInit {

 // @ViewChild("tableEntered", { static: true }) tablePdf!: ElementRef;

  listMove: any[] = []
  window = (<any>window)
  movSelect: any = {}

  constructor(private store: StorageService) { }


  makeJSPdf(attr: any) {



    // @ts-ignore
    var generateData = function(amount) {
      var result = [];
      var data = {
        coin: "100",
        game_group: "GameGroup",
        game_name: "XPTO2",
        game_version: "25",
        machine: "20485861",
        vlt: "0"
      };

        // @ts-ignore
      for (var i = 0; i < amount; i += 1) {
          // @ts-ignore
        data.id = (i + 1).toString();
        result.push(Object.assign({}, data));
      }
      return result;
    };
    
    function createHeaders(keys:any) {
      var result = [];
      for (var i = 0; i < keys.length; i += 1) {
        result.push({
          id: keys[i],
          name: keys[i],
          prompt: keys[i],
          width: 100,
          padding: 2
        });
      }
      return result;
    }
    
    let headers:any = createHeaders([
      "id",
      "coin",
      "game_group",
      "game_name",
      "game_version",
      "machine",
      "vlt"
    ]);
    
    var doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("textando tas as funcões",10,10)
    doc.table(10, 40, generateData(10), headers, { autoSize: true });


    doc.output('dataurlnewwindow');
    doc.save()


      // let PDF = new jsPDF();

      // PDF.text('Ola munzambi', 10,10)

      // PDF.output('dataurlnewwindow');
      // PDF.save()


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
