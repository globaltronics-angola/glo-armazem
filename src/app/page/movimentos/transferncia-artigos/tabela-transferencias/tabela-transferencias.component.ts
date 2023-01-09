import {Component} from '@angular/core';
import ServiceUtil from "../../../../Services/ServiceUtil";
import {StorageService} from "../../../../shared/storage.service";
import {AuthService} from "../../../../shared/auth.service";
import ServiceMovimento from "../../../../Services/ServiceMovimento";

//@ts-ignore
import pdfMake from "pdfmake/build/pdfmake";

@Component({
  selector: 'app-tabela-transferencias',
  templateUrl: './tabela-transferencias.component.html',
  styles: []
})
export class TabelaTransferenciasComponent {
  listMove: any[] = []
  utilFunctions: ServiceUtil;

  user: any = {}

  constructor(private store: StorageService, private auth: AuthService) {
    this.utilFunctions = new ServiceUtil()
    this.user = auth.user;
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

  deleteMovementAndItems(attr: any) {
  }


  makeJSPdf(attr: any) {


    const docDefinition = {

      content: [
        {text: "Tables", style: "header"},

        {
          text: attr.details,
          style: "context"
        },
        "",
        {
          style: "tableExample",
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],

            body: () => {
              return [
                [{text: "Table 1", style: "tableHeader"}],
              ]
            }
          }
        },
        {qr: attr.id, style: "qrStyle"}

      ],

      styles: {
        header: {
          fontSize: 14,
          bold: false,
          margin: [0, 0, 0, 10],
          color: "red",
          pdfFonts: ["", "", "",]
        },
        qrStyle: {
          bold: false,
          fontSize: 11
        },
        context: {
          fontSize: 11,
          bold: false,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();


  }


  initDataTable() {

    try {
      let table = document.querySelector('#kt_customers_tableOut');
      //@ts-ignore
      datatable = $(table).DataTable({
        "info": false,
        'order': [],
        'columnDefs': [
          {orderable: false, targets: 0}, // Disable ordering on column 0 (checkbox)
          {orderable: false, targets: 6}, // Disable ordering on column 6 (actions)
        ]
      });
    } catch (e: any) {

    }

  }
}
