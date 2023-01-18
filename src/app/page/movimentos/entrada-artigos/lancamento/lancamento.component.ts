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

  constructor(private store: StorageService, private auth: AuthService, private print: ServicePrintMove) {
    this.momentFormat = moment().format('DDMMYYYY');
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
          {orderable: false, targets: 0}, // Disable ordering on column 0 (checkbox)
          {orderable: false, targets: 6}, // Disable ordering on column 6 (actions)
        ]
      });
    } catch (e: any) {

    }

  }

  pdfGenerator() {
    let highchartSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 260.93 157.51">
      <defs>
        <style>
          .cls-1{fill:none;}.cls-2,.cls-5{font-size:72.94px;font-family:Montepetrum-Bold,
          Montepetrum;font-weight:700;}.cls-2{fill:#060063;}.cls-3{clip-path:url(#clip-path);}.cls-4{fill:url(#linear-gradient);}.cls-5{fill:#16aaf7;}</style>
        <clipPath id="clip-path" transform="translate(4.93)">
          <path class="cls-1"
            d="M37.49,112.48A16.62,16.62,0,1,1,22.05,94.76,16.62,16.62,0,0,1,37.49,112.48ZM60.1,84.79a12,12,0,1,0-12.75,11.1A12,12,0,0,0,60.1,84.79ZM29.43,57.23A8.93,8.93,0,1,0,39,48.94,8.92,8.92,0,0,0,29.43,57.23ZM82.5,97.39A8.93,8.93,0,1,0,73,105.68,8.92,8.92,0,0,0,82.5,97.39ZM57.09,65.61a8.93,8.93,0,1,0,9.52-8.29A8.92,8.92,0,0,0,57.09,65.61Zm2.2,41a13.32,13.32,0,1,0,12.37,14.21A13.32,13.32,0,0,0,59.29,106.61ZM88,115.9a8.22,8.22,0,1,0,7.64,8.77A8.23,8.23,0,0,0,88,115.9Zm24.25-5.78a4.43,4.43,0,1,0-4.11-4.72A4.42,4.42,0,0,0,112.26,110.12ZM99.89,79.55A4.43,4.43,0,1,0,104,84.27,4.41,4.41,0,0,0,99.89,79.55ZM92,67.19a4.43,4.43,0,1,0-4.11-4.72A4.41,4.41,0,0,0,92,67.19ZM56.76,33.87a4.43,4.43,0,1,0-4.11-4.72A4.42,4.42,0,0,0,56.76,33.87Zm17.86,9.94a4.43,4.43,0,1,0-4.11-4.72A4.42,4.42,0,0,0,74.62,43.81Zm39.07,45.74a2.8,2.8,0,1,0-2.6-3A2.78,2.78,0,0,0,113.69,89.55Zm0-14.85a2,2,0,1,0-1.83-2.11A2,2,0,0,0,113.74,74.7ZM102.58,68a2.8,2.8,0,1,0,2.6,3A2.79,2.79,0,0,0,102.58,68Zm9.22,50.57a6.4,6.4,0,1,0,5.94,6.82A6.4,6.4,0,0,0,111.8,118.57ZM94.28,96.79a6.4,6.4,0,1,0,5.94,6.82A6.4,6.4,0,0,0,94.28,96.79ZM53.13,46.31A6.4,6.4,0,1,0,60,40.37,6.39,6.39,0,0,0,53.13,46.31Zm23.41,4.15a6.4,6.4,0,1,0,6.82-5.94A6.39,6.39,0,0,0,76.54,50.46ZM78.1,77.13a6.4,6.4,0,1,0,6.82-5.94A6.39,6.39,0,0,0,78.1,77.13Zm-51.49-4.2A13.32,13.32,0,1,0,12.4,85.3,13.32,13.32,0,0,0,26.61,72.93ZM9.78,52.17a9.16,9.16,0,1,0-8.5-9.77A9.16,9.16,0,0,0,9.78,52.17ZM8,25.88A6.4,6.4,0,1,0,2,19.06,6.41,6.41,0,0,0,8,25.88ZM29.42,36.2a6.4,6.4,0,1,0,6.82-5.94A6.4,6.4,0,0,0,29.42,36.2Zm4.11-13.7a4.43,4.43,0,1,0-4.11-4.72A4.43,4.43,0,0,0,33.53,22.5ZM57.6,19.25a2.8,2.8,0,1,0-2.6-3A2.8,2.8,0,0,0,57.6,19.25Zm14.1,8.38a2.8,2.8,0,1,0,3-2.59A2.81,2.81,0,0,0,71.7,27.63Zm1.12-10.58A2,2,0,1,0,71,14.94,2,2,0,0,0,72.82,17.05Z" />
        </clipPath>
        <linearGradient id="linear-gradient" x1="37.19" y1="141.14" x2="89.04" y2="19.78"
          gradientUnits="userSpaceOnUse">
          <stop offset="0.01" stop-color="#04005e" />
          <stop offset="0.09" stop-color="#040b66" />
          <stop offset="0.22" stop-color="#03297d" />
          <stop offset="0.4" stop-color="#0158a1" />
          <stop offset="0.54" stop-color="#0087c5" />
          <stop offset="1" stop-color="#5ee1ed" />
        </linearGradient>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <text class="cls-2" transform="translate(140.32 62.36)">GLOBAL</text>
          <g class="cls-3">
            <rect class="cls-4" y="7.76" width="131.98" height="131.98" />
          </g>
          <text class="cls-5" transform="translate(139.14 131.16)">TRONICS</text>
        </g>
      </g>
    </svg>`;

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
          text: g.details ? g.details : {text: '-- -- -- --', style: 'span'},
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
          margin: [-28, 2, 2, 2]
        },
        {text: ('Movimentos de entrada Registrados').toUpperCase(), fontSize: 9, bold: true, margin: [0, 20, 0, 10]},
        {
          style: 'tableExample',
          table: {
            widths: [80, 85, 35, 185, 75],
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
    this.print.printFunctions(move.oItem.items, move);
  }
}
