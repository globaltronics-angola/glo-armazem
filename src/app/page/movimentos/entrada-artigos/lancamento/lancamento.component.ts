import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import ServiceMovimento from "../../../../Services/ServiceMovimento";
import {StorageService} from "../../../../shared/storage.service";
import ServiceUtil from "../../../../Services/ServiceUtil";
import moment from "moment";
import {AuthService} from "../../../../shared/auth.service";
import ServicePrintMove from "../../../../Services/ServicePrintMove";
//@ts-ignore
import * as pdfMake from "pdfmake";
import {StorageServicePaginateService} from "../../../../shared/storage.service.paginate.service";
import ServiceFornecedor from "../../../../Services/ServiceFornecedor";
import {ScropePaginationService} from "../../../../shared/scrope-pagination.service";


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
  util: any = ServiceUtil;
  momentFormat: any;

  pageTotal!: number;
  typingName: string = ""
  isSearch: string = "Nome"
  awaitingProcess: boolean = false;
  public page: StorageServicePaginateService;

  constructor(private store: StorageService, private auth: AuthService, private print: ServicePrintMove) {
    this.momentFormat = moment().format('DDMMYYYY');
    this.page = new StorageServicePaginateService(this.store, this.auth, ServiceMovimento.STORAGE_NAME, 'id')
  }


  async ngOnInit() {
    this.listMove = await new ServiceMovimento(this.store).findMovType();
    this.pageTotal = await this.page.getCounterInfo()
    this.awaitingProcess = true;
  }

  somarGeral(dataArry: any) {

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
          {orderable: false, targets: 0}, // Disable ordering on column 0 (checkbox)
          {orderable: false, targets: 6}, // Disable ordering on column 6 (actions)
        ]
      });
    } catch (e: any) {

    }

  }

  pdfGenerator() {
    let highchartSvg = ServiceUtil.IconGlo;

    let content = [
      [
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'DATA', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'REFERENCIA', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'TOTAL', style: 'tableHeader'},
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
        {margin: [2, 1, 1, 1], fillColor: '#fff', text: infoFinancial, style: 'allEnd'},
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
            widths: [80, 100, 45, 160, 75],
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
          alignment: 'justify',
          color: '#E6B0AA'
        },
        table: {
          width: '1000px'
        },
        all: {
          fontSize: 8.5,
          alignment: 'justify',
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

  deleteMove(attr: any) {
    let move: ServiceMovimento = new ServiceMovimento(this.store);
    move.oItem = attr;
    move.oItem.updated_mode = true;
    move.oItem.deleted_at = moment().format('DD, MM YYY hh:mm:ss')

    move.oItem.userDelete = this.auth.user;

    move.save()
  }

  printMov(attr: any) {

    let move: ServiceMovimento = new ServiceMovimento(this.store)
    move.oItem = attr
    if (attr.moveType == "INPUT")
      this.print.printFunctions(move.oItem.items, move);
    if (attr.moveType == "OUTPUT")
      this.print.printFunctionsRequisition(move.oItem.items, move);
    if (attr.moveType == "TRANSFER")
      this.print.printFunctionsTransfer(move.oItem.items, move);
  }

  async find() {

    await this.page.findByFieldContext('docRef', this.typingName.toUpperCase())


  }

  setSearch(attr: string) {
    this.isSearch = attr;
  }
}
