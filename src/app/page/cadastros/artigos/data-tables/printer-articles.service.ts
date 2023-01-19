import {Injectable} from '@angular/core';
import {firstValueFrom} from "rxjs";
import ServiceUtil from "../../../../Services/ServiceUtil";
import moment from "moment";
//@ts-ignore
import * as pdfMake from "pdfmake";
import ServiceArticles from "../../../../Services/ServiceArticles";
import {StorageService} from "../../../../shared/storage.service";
import {AuthService} from "../../../../shared/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PrinterArticlesService {
  private Article: ServiceArticles;

  constructor(private store: StorageService, private auth: AuthService) {
    this.Article = new ServiceArticles(this.store);
  }


  pdfGenerator() {
    firstValueFrom(this.Article.findAll()).then((a: any[]) => {
      let highchartSvg = ServiceUtil.IconGlo;

      let content = [
        [
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: '#', style: 'tableHeader'},
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NOME DO ARTIGO', style: 'tableHeader'},
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'REFERÊNCIA', style: 'tableHeader'},
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'MODELO', style: 'tableHeader'},
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'MARCA', style: 'tableHeader'},
        ]
      ]

      a.forEach((g, index: number) => {
        content.push([
          {margin: [2, 1, 1, 1], fillColor: '#fff', text: (index + 1), style: 'all'},
          {margin: [2, 1, 1, 1], fillColor: '#fff', text: g.name, style: 'all'},
          {
            margin: [2, 1, 1, 1],
            fillColor: '#fff',
            text: g.ean ? g.ean : {text: '-- -- -- --', style: 'span'},
            style: 'all'
          },
          {
            margin: [2, 1, 1, 1],
            fillColor: '#fff',
            text: g.model ? g.model : {text: '-- -- -- --', style: 'span'},
            style: 'all'
          },
          {
            margin: [2, 1, 1, 1],
            fillColor: '#fff',
            text: g.marquee ? g.marquee : {text: '-- -- --', style: 'span'},
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
          {text: 'Lista de Artigos Cadastrados', fontSize: 14, bold: true, margin: [0, 20, 0, 10]},
          {
            style: 'tableExample',
            table: {
              widths: [20, 150, 100, 100, 80],
              headerRows: 1,
              body: content
            },
            layout: 'lightHorizontalLines'
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
            fontSize: 9,
            color: '#515A5A',
          },
          span: {
            fontSize: 9,
            alignment: 'justify',
            color: '#E6B0AA'
          },
          table: {
            width: '1000px'
          },
          all: {
            fontSize: 9,
            alignment: 'justify',
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
      pdf.download('article' + moment().format('DD_MM_YYYY_HH_mm_ss') + "");


    })
  }
}
