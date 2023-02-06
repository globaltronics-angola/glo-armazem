import {Component} from '@angular/core';
import ServiceMovimento from "../../../../Services/ServiceMovimento";
import ServiceUtil from "../../../../Services/ServiceUtil";
import moment from "moment";
import pdfMake from "pdfmake/build/pdfmake";
import {StorageServicePaginateService} from "../../../../shared/storage.service.paginate.service";
import {StorageService} from "../../../../shared/storage.service";
import {AuthService} from "../../../../shared/auth.service";
import ServicePrintMove from "../../../../Services/ServicePrintMove";
import ServiceInventario from "../../../../Services/ServiceInventario";

@Component({
  selector: 'app-tabela-inventario',
  templateUrl: './tabela-inventario.component.html',
  styleUrls: ['./tabela-inventario.component.css']
})
export class TabelaInventarioComponent {

  listMove: any[] = []
  utilFunctions: ServiceUtil;

  user: any = {}
  pageTotal!: number;
  typingName: string = ""
  isSearch: string = "Nome"
  awaitingProcess: boolean = false;
  public page: StorageServicePaginateService;

  constructor(private store: StorageService, private auth: AuthService, private printer: ServicePrintMove) {
    this.utilFunctions = new ServiceUtil()
    this.user = auth.user;
    this.page = new StorageServicePaginateService(this.store, this.auth, ServiceInventario.STORAGE_MOVE, 'id')
  }

  async ngOnInit() {
    this.listMove = await new ServiceInventario(this.store).findMovType("INVENTORY");
    this.pageTotal = await this.page.getCounterInfo()
    this.awaitingProcess = true;
  }

  kFormatter(attr: string) {
    return attr
  }

  printMov(attr: any) {
    let move: ServiceInventario = new ServiceInventario(this.store)
    move.oItem = attr
    this.printer.printFunctionsInventory(move.oItem.items, move);
  }

  deleteMovementAndItems(attr: any) {
  }


  pdfGenerator() {
    let highchartSvg = ServiceUtil.IconGlo;

    let content = [
      [
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'DATA', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'REFERENCIA', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'DETALHES', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'RESPONSÁVEL', style: 'tableHeader'},


      ]
    ]

    this.listMove.forEach((g) => {


      let infoFinancial = g.financialCostTotal + ' KZ';


      content.push([
        {
          margin: [2, 1, 1, 1], fillColor: '#fff',
          text: g.created_at ? g.created_at : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {margin: [2, 1, 1, 1], fillColor: '#fff', text: g.docRef, style: 'all'},
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: g.details ? g.details.slice(0, 40) : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: g.user ? g.user.displayName : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        }
      ])
    })

    var dd = {
      content: [
        {
          svg: highchartSvg,
          width: 100,
          height: 30,
          margin: [0, 2, 2, 2]
        },
        {text: ('Movimentos de entrada Registrados').toUpperCase(), fontSize: 9, bold: true, margin: [0, 20, 0, 10]},
        {
          style: 'tableExample',
          table: {
            widths: [80, 110, 160, 110],
            headerRows: 1,
            body: content,
          },
          layout: 'lightHorizontalLines'
        },
        {
          text: '',
          fontSize: 8,
          bold: false,
          margin: [20, 20, 20, 20],
          alignment: 'justify'
        },
        {
          qr: this.auth.user.displayName + moment().format('DD / MM / YYYY HH:mm.s'),
          fit: 80,
          alignment: 'right',
          foreground: '#D7D5D5'
        },
        {
          text: 'Data: ' + moment().format('DD / MM / YYYY HH:mm.s'),
          fontSize: 11,
          color: '#D7DBDD',
          bold: false,
          margin: [0, 20, 0, 0]
        },
        {
          text: 'Autor : ' + this.auth.user.displayName + '',
          fontSize: 11,
          color: '#D7DBDD',
          bold: false,
          margin: [0, 0, 0, 1]
        },
      ],
      styles: {
        tableHeader: {
          bold: true,
          fontSize: 9,
          color: '#0a0a0a',
        },
        span: {
          fontSize: 8,

          color: '#E6B0AA'
        },
        table: {
          width: '1000px'
        },
        all: {
          fontSize: 8.5,

          color: '#515A5A'
        },
        allEnd: {
          fontSize: 8.5,
          alignment: 'right',
          color: '#515A5A'
        },
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      },
    }

    var pdf = pdfMake.createPdf(dd);
    pdf.print();
  }


  async find() {
    await this.page.findByFieldContext('docRef', this.typingName.toUpperCase())
  }

  setSearch(attr: string) {
    this.isSearch = attr;
  }
}
