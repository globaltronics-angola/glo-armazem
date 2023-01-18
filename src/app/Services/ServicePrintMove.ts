import moment from "moment";

//@ts-ignore
import * as pdfMake from "pdfmake";
import {Injectable} from "@angular/core";
import {AuthService} from "../shared/auth.service";
import ServiceUtil from "./ServiceUtil";
import {firstValueFrom} from "rxjs/internal/firstValueFrom";
import {StorageService} from "../shared/storage.service";
import ServiceStorage from "./ServiceStorage";

@Injectable({
  providedIn: 'root'
})
export default class ServicePrintMove {
  static STORAGE_EXIST_ITEM: string = "global-existence"

  constructor(private auth: AuthService, private store: StorageService) {

  }

  printFunctions(listItems: any[], move: any) {


    let content = [
      [
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'REFERÊNCIA', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NOME DO ARTIGO', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'QT', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'LOCALIZAÇÃO', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'VALOR', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'FORNECEDOR', style: 'tableHeader'},

      ]
    ]

    listItems.forEach((g) => {

      let articleInfo = g.article ? JSON.parse(g.article) : {};
      let infoArticle = articleInfo?.name + ', ' + articleInfo?.model;
      let localStore = (g.localStorage ? JSON.parse(g.localStorage) : {});
      let localAmby = localStore.name + ', ' + (g.localAmbry ? JSON.parse(g.localAmbry).ambry : {}) + ', ' + (g.localShelf ? JSON.parse(g.localShelf) : '');

      let infoFinancial = g.financialCost + ' KZ';
      let providerInfo = g.provider ? JSON.parse(g.provider) : {};

      content.push([
        {
          margin: [2, 1, 1, 1], fillColor: '#fff',
          text: articleInfo.ean ? articleInfo.ean : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {margin: [2, 1, 1, 1], fillColor: '#fff', text: infoArticle, style: 'all'},
        {margin: [2, 1, 1, 1], fillColor: '#fff', text: g.quantity, style: 'allEnd'},
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: localStore.name ? localAmby : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: infoFinancial ? infoFinancial : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [2, 1, 1, 1],
          fillColor: '#fff',
          text: providerInfo.name ? providerInfo.name : {text: '-- -- --', style: 'span'},
          style: 'all'
        }
      ])
    })

    var dd = {
      content: [
        {
          svg: ServiceUtil.IconGlo,
          width: 100,
          height: 30,
          margin: [0, 2, 2, 2]
        },
        {
          text: 'Ref : ' + move.oItem.docRef,
          fontSize: 8,
          bold: false,
          margin: [0, 0, 0, 10],
          alignment: 'justify'
        },
        {
          text: move.oItem.details,
          fontSize: 8,
          bold: false,
          margin: [0, 20, 0, 10],
          alignment: 'justify'
        },
        {text: ('Artigos do movimento de entrada').toUpperCase(), fontSize: 9, bold: true, margin: [0, 20, 0, 10]},
        {
          style: 'tableExample',
          table: {
            widths: [70, 150, 15, 90, 35, 80],
            headerRows: 1,
            body: content
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
          qr: move.oItem.docRef,
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
          fontSize: 8,
          alignment: 'justify',
          color: '#515A5A'
        },
        allEnd: {
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

    var pdf = pdfMake.createPdf(dd);
    pdf.print();


  }

  printFunctionsRequisition(listItems: any[], move: any) {

    let client: any = move.oItem.client ? JSON.parse(move.oItem.client) : {}

    let content = [
      [
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'REFERÊNCIA', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NOME', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'MODELO', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'S/N', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'QT', style: 'tableHeader'},
      ]
    ]

    listItems.forEach((g) => {

      let article = g.article ? JSON.parse(g.article) : {};

      content.push([
        {
          margin: [1, 1, 1, 1], fillColor: '#fff',
          text: article.ean ? article.ean : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {margin: [1, 1, 1, 1], fillColor: '#fff', text: article?.name, style: 'all'},
        {
          margin: [1, 1, 1, 1],
          fillColor: '#fff',
          text: article.model ? article.model.toUpperCase() : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [1, 1, 1, 1],
          fillColor: '#fff',
          text: g.SN ? g.SN.toUpperCase() : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [1, 1, 10, 1],
          fillColor: '#fff',
          text: g.quantity ? g.quantity : {text: '-- -- --', style: 'span'},
          style: 'allEnd',

        }
      ])
    })

    var dd = {
      content: [
        {
          svg: ServiceUtil.IconGlo,
          width: 100,
          height: 30,
          margin: [0, 2, 2, 2]
        },
        {
          text: 'Ref : ' + move.oItem.docRef,
          fontSize: 8,
          bold: false,
          margin: [0, 0, 0, 10],
          alignment: 'justify'
        },

        {
          text: client.name ? ('Cliente : ').toUpperCase() + client.name : '',
          fontSize: 9,
          alignment: 'right',
          bold: false,
          margin: [0, 0, 0, 3]
        },
        {
          text: client.identityClient ? ('Nif : ').toUpperCase() + client.identityClient : '',
          fontSize: 9,
          alignment: 'right',
          bold: false,
          margin: [0, 0, 0, 10]
        },
        {
          text: move.oItem.title ? ('Requesição De uma : ').toUpperCase() + move.oItem.title.toUpperCase() : '',
          fontSize: 9,
          bold: true,
          margin: [0, 10, 0, 0]
        },
        {
          text: move.oItem.details,
          fontSize: 8,
          bold: false,
          margin: [0, 5, 0, 10],
          alignment: 'justify'
        },
        {text: ('Artigos da requisição').toUpperCase(), fontSize: 9, bold: true, margin: [0, 20, 0, 10]},
        {
          style: 'tableExample',
          table: {
            widths: [70, 125, 90, 107, 60],
            headerRows: 1,
            body: content
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
          qr: move.oItem.docRef,
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
        tableExample: {
          width: 1000
        },
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
          fontSize: 8,
          alignment: 'justify',
          color: '#515A5A'
        },
        allEnd: {
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

    var pdf = pdfMake.createPdf(dd);
    pdf.print();


  }

  printFunctionsTransfer(listItems: any[], move: any) {

    let client: any = {}

    let content = [
      [
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'REFERÊNCIA', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NOME', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'ANTERIOR', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'ATUAL', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'S/N', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'QT', style: 'tableHeader'},
      ]
    ]

    listItems.forEach(async (g) => {

      let article: any = g.article ? JSON.parse(g.article) : {}
      let name = article?.name + ', ' + article?.model
      let localStore = (g.localStorage ? JSON.parse(g.localStorage) : {});
      let localAmby = localStore.name + ', ' + (g.localAmbry ? JSON.parse(g.localAmbry).ambry : {}) + ', ' + (g.localShelf ? JSON.parse(g.localShelf) : '');

      let existence = (g.existence ? JSON.parse(g.existence) : {});

      let storage = (g.localStorageExistance ? JSON.parse(g.localStorageExistance) : {})
      let anterior = storage?.name + ', ' + existence?.localAmbry + ', ' + existence?.localShelf
      content.push([
        {
          margin: [1, 1, 1, 1], fillColor: '#fff',
          text: article.ean ? article.ean : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {margin: [1, 1, 1, 1], fillColor: '#fff', text: name, style: 'all'},
        {
          margin: [1, 1, 1, 1],
          fillColor: '#fff',
          text: anterior ? anterior : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [1, 1, 1, 1],
          fillColor: '#fff',
          text: localAmby ? localAmby : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [1, 1, 1, 1],
          fillColor: '#fff',
          text: g.SN ? g.SN.toUpperCase() : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [1, 1, 10, 1],
          fillColor: '#fff',
          text: g.quantity ? g.quantity : {text: '-- -- --', style: 'span'},
          style: 'allEnd',

        }
      ])
    })

    var dd = {
      content: [
        {
          svg: ServiceUtil.IconGlo,
          width: 100,
          height: 30,
          margin: [0, 2, 2, 2]
        },
        {
          text: 'Ref : ' + move.oItem.docRef,
          fontSize: 8,
          bold: false,
          margin: [0, 0, 0, 10],
          alignment: 'justify'
        },

        {
          text: move.oItem.details,
          fontSize: 8,
          bold: false,
          margin: [0, 5, 0, 10],
          alignment: 'justify'
        },
        {text: ('Artigos Transferidos').toUpperCase(), fontSize: 9, bold: true, margin: [0, 20, 0, 10]},
        {
          style: 'tableExample',
          table: {
            widths: [70, 78, 90, 90, 88, 30],
            headerRows: 1,
            body: content
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
          qr: move.oItem.docRef,
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
        tableExample: {
          width: 1000
        },
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
          fontSize: 8,
          alignment: 'justify',
          color: '#515A5A'
        },
        allEnd: {
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

    var pdf = pdfMake.createPdf(dd);
    pdf.print();


  }


  convertTo(resp: any) {
    return resp.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;

      return data;
    })
  }
}
