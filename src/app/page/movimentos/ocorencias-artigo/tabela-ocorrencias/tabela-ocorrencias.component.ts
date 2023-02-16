import {Component, OnInit} from '@angular/core';
import ServiceUtil from "../../../../Services/ServiceUtil";
import {StorageServicePaginateService} from "../../../../shared/storage.service.paginate.service";
import ServiceExistance from "../../../../Services/ServiceExistance";
import {StorageService} from "../../../../shared/storage.service";
import {AuthService} from "../../../../shared/auth.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import moment from "moment";
// @ts-ignore
import * as pdfMake from "pdfmake";

@Component({
  selector: 'app-tabela-ocorrencias',
  templateUrl: './tabela-ocorrencias.component.html',
  styles: []
})
export class TabelaOcorrenciasComponent implements OnInit {

  private window = (<any>window);

  pageTotal!: number;
  typingName: string = ""
  isSearch: string = "Nome"
  util: ServiceUtil;
  awaitingProcess: boolean = false;
  public page: StorageServicePaginateService;
  private existance: ServiceMovimentoItems;

  constructor(private store: StorageService, private auth: AuthService, private router: Router, private sanitizer: DomSanitizer) {
    this.existance = new ServiceMovimentoItems(this.store);
    this.page = new StorageServicePaginateService(this.store, this.auth, ServiceMovimentoItems.STORAGE_NAME, 'id')
    this.util = new ServiceUtil();
  }

  async ngOnInit() {
    this.window.InstanceAplication.init()
    this.pageTotal = await this.page.getCounterInfo()
    this.awaitingProcess = true;
  }

  printMov(mov: any) {

  }

  pdfGenerator() {

    let highchartSvg = ServiceUtil.IconGlo;

    let content = [
      [
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: '#', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NOME DO ARTIGO', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'MOV', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'DATA', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'QT', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'LOCAL', style: 'tableHeader'},
      ]
    ]

    this.page.listDataArray.forEach((g, index: number) => {

      let article: any = g.article ? JSON.parse(g.article) : {};

      let mov: string = "";
      if (g.moveType == 'INPUT') {
        mov = 'Entrada'
      }

      if (g.moveType == 'OUTPUT') {
        mov = 'Saida'
      }

      if (g.moveType == 'TRANSFER') {
        mov = 'Transfe...'
      }

      if (g.moveType == 'DEVOLUTION') {
        mov = 'Devolu...'
      }

      if (g.moveType == 'DOWNLOAD') {
        mov = 'Baixa'
      }

      let localStorage: string = (g.localStorage ? JSON.parse(g.localStorage).name : '')
        + ' ' + (g.localAmbry ? JSON.parse(g.localAmbry).ambry.name : '')
        + ' ' + (g.localShelf ? JSON.parse(g.localShelf).name : '')
      content.push([
        {margin: [2, 1, 1, 1], fillColor: '#fff', text: (index + 1), style: 'all'},
        {margin: [2, 1, 1, 1], fillColor: '#fff', text: article.name, style: 'all'},

        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: mov ? mov : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: g.created_at.slice(0,11),
          style: 'all'
        }
        ,
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: g.quantity,
          style: 'allR'
        }
        ,
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: localStorage,
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
        {text: 'Ocorrências no Armazém', fontSize: 14, bold: true, margin: [0, 20, 0, 10]},
        {
          style: 'tableExample',
          table: {
            widths: [15, 140, 50, 70, 20, 130],
            headerRows: 1,
            body: content
          },
          layout: 'lightHorizontalLines'
        },
        {
          text: '',
          fontSize: 11,
          color: '#D7DBDD',
          bold: false,
          margin: [20, 20, 20, 20]
        },
        {
          qr: moment().format('DD / MM / YYYY') + 'user=' + this.auth.user.displayName,
          fit: 80,
          alignment: 'right',
          foreground: '#D7D5D5'
        },
        {
          text: 'Data:' + moment().format('DD / MM / YYYY'),
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
          fontSize: 8,
          color: '#515A5A',
        },
        span: {
          fontSize: 8,

          color: '#E6B0AA'
        },
        table: {
          width: '1000px'
        },
        all: {
          fontSize: 8,

          color: '#515A5A'
        },
        allR: {
          fontSize: 8,
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
    let pdf = pdfMake.createPdf(dd);
    pdf.open();

  }

  async find() {
      await this.page.findByFieldContext('articleName', this.typingName)
  }

  setSearch(attr: string) {
    this.isSearch = attr;
  }
}
