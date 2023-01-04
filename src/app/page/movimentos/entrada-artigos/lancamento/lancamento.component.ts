import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import ServiceMovimento from "../../../../Services/ServiceMovimento";
import { StorageService } from "../../../../shared/storage.service";
import ServiceUtil from "../../../../Services/ServiceUtil";
import moment from 'moment';
//@ts-ignore
import pdfMake from "pdfmake/build/pdfmake";
//@ts-ignore
import pdfFonts from "pdfmake/build/vfs_fonts";

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


  generatePdf(attr: any) {
    // const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };

    const docDefinition = {

      content: [
        { text: "Tables", style: "header" },
        "Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.",
        '<a>angola</a>',
        {
          text:
            "A simple table (no headers, no width specified, no spans, no styling)",
          style: "subheader"
        },
        "The following table has nothing more than a body array",
        { qr: 'text in QR' },

        /* {
          // if you specify both width and height - image will be stretched
          image: 'data:image/jpeg;base64,...encodedContent...',
          width: 150,
          height: 150
        }, */
        {
          style: "tableExample",
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],

            body: [
              ['First', 'Second', 'Third', 'The last one'],
              ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
              [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4']
            ]
          }
        },
        {
          // if you specify both width and height - svg will be stretched
          svg: '<svg width="300" height="200" viewBox="0 0 300 200">...</svg>',
          width: 600,
          height: 400
        },
        {
          // you can also fit the svg inside a rectangle
          svg: '<svg width="300" height="200" viewBox="0 0 300 200">...</svg>',
          fit: [150, 100]
        }
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          color: "red",
          pdfFonts: ["", "", "",]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();

  }

  makeJSPdf(attr: any) {

    let pdf = new jsPDF('p', 'pt', 'a4');


    pdf.html(
      '<h1>Hello Munzambi Miguel</h1>'
      , {
        callback: (pdf) => {
          //pdf.text('Hello, world', 10, 10)
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
