import {Component, OnDestroy, OnInit} from '@angular/core';
import ServiceUtil from "../../../../Services/ServiceUtil";
import {StorageService} from "../../../../shared/storage.service";
import {ActivatedRoute} from "@angular/router";
import {ServiceEmitter} from "../../../../Services/ServiceEmitter";
import {firstValueFrom, Subscription} from "rxjs";
import ServiceStorage from "../../../../Services/ServiceStorage";
import moment from "moment";
//@ts-ignore
import * as pdfMake from "pdfmake";
import {AuthService} from "../../../../shared/auth.service";

@Component({
  selector: 'app-info-armazem',
  templateUrl: './info-armazem.component.html',
  styles: []
})
export class InfoArmazemComponent implements OnInit, OnDestroy {
  util: any = ServiceUtil;
  armazem: any;
  subscription!: Subscription
  private window = (<any>window)
  instancePra!: any[];

  constructor(private store: StorageService, private route: ActivatedRoute, private auth: AuthService) {

    this.subscription = ServiceEmitter.get('informacao').subscribe(e => {
      this.armazem = e;
    })
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('information')) {
      this.armazem = this.util.requestDataInfo(this.route)
      console.log(this.armazem)
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }


  openViews(id: string, attr: any[]) {
    this.window.$('#' + id).removeClass('d-none')
    this.instancePra = attr;
  }

  printeFunct() {


    let highchartSvg = ServiceUtil.IconGlo;
    let content = [
      [
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'ARMÁRIO', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'PRATELEIRA', style: 'tableHeader'},
        {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'TOTAL', style: 'tableHeader'},

      ]
    ]

    this.armazem.ambry.forEach((e: any) => {

      let prateleiras: string = "";

      e.shelf.forEach((ds: any) => {
        prateleiras += ds.name + ";  "
      })

      content.push([
        {
          margin: [2, 1, 1, 1], fillColor: '#fff',
          text: e.ambry.name ? e.ambry.name : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [2, 1, 1, 1], fillColor: '#fff',
          text: prateleiras ? prateleiras + ' ...'  : {text: '-- -- -- --', style: 'span'},
          style: 'all'
        },
        {
          margin: [2, 1, 10, 1], fillColor: '#fff',
          text: e.shelf.length  ? e.shelf.length  : {text: '-- -- -- --', style: 'span'},
          style: 'allR'
        },
      ])
    })

    var dd = {
      content: [
        {
          svg: highchartSvg,
          width: 100,
          height: 30,
          margin: [2, 2, 2, 2]
        },
        {
          text: 'Ref: ' + this.armazem.id.toUpperCase(),
          fontSize: 8,
          bold: false,
          margin: [0, 0, 0, 10],
          alignment: 'justify'
        },
        {text: this.armazem.name.toUpperCase(), fontSize: 14, bold: true, margin: [0, 20, 0, 10]},
        {
          text: this.armazem.details,
          fontSize: 8,
          bold: false,
          margin: [0, 5, 0, 10],
          alignment: 'justify'
        },
        {text: 'Armarios e Prateleiras'.toUpperCase(), fontSize: 9, bold: true, margin: [0, 10, 0, 10]},
        {
          style: 'tableExample',
          table: {
            widths: [165, 300,40],
            headerRows: 1,
            body: content
          },
          layout: 'lightHorizontalLines'
        },
        {
          text: '', margin: [20, 20, 20, 20]
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
          fontSize: 11,
          color: '#515A5A',
        },
        span: {
          fontSize: 11,
          alignment: 'justify',
          color: '#E6B0AA'
        },
        table: {
          width: '1000px'
        },
        all: {
          fontSize: 11,
          alignment: 'justify',
          color: '#515A5A'
        },
        allInterno: {
          fontSize: 11,
          alignment: 'justify',
          color: '#515A5A',
        }
        , allR: {
          fontSize: 11,
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
}
