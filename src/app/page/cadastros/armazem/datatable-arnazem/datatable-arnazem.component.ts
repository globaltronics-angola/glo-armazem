import {Component, NgZone, OnInit} from '@angular/core';
import {StorageServicePaginateService} from "../../../../shared/storage.service.paginate.service";
import {StorageService} from "../../../../shared/storage.service";
import {AuthService} from "../../../../shared/auth.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import ServiceFornecedor from "../../../../Services/ServiceFornecedor";
import ServiceUtil from "../../../../Services/ServiceUtil";
import {ServiceEncryptDecriptSimples} from "../../../../Services/service-encrypt-decript-simples";
import {firstValueFrom} from "rxjs";
import moment from "moment";
// @ts-ignore
import * as pdfMake from "pdfmake";
import ServiceStorage from "../../../../Services/ServiceStorage";
import {ServiceEmitter} from "../../../../Services/ServiceEmitter";

@Component({
  selector: 'app-datatable-arnazem',
  templateUrl: './datatable-arnazem.component.html',
  styles: []
})
export class DatatableArnazemComponent implements OnInit {
  private window = (<any>window);

  ServiceUtil: ServiceUtil;
  downloadJsonHref: any;

  pageTotal!: number;
  typingName: string = ""
  isSearch: string = "Nome"
  awaitingProcess: boolean = false;
  public page: StorageServicePaginateService;

  constructor(private store: StorageService, private auth: AuthService, private router: Router,
              private sanitizer: DomSanitizer, private ngZone: NgZone) {

    this.ServiceUtil = new ServiceUtil()
    this.page = new StorageServicePaginateService(this.store, this.auth, ServiceStorage.STORAGE_NAME)
  }

  async ngOnInit() {
    this.window.InstanceAplication.init()
    await this.page.pageDefault();
    this.pageTotal = await this.page.getCounterInfo()
    this.awaitingProcess = true;


  }

  delete(attr: any) {
    let Obj: ServiceStorage = new ServiceStorage(this.store);
    Obj.IObjectClass = attr;
    Obj.delete()
    this.page.pageDefault()
  }


  edit(attr: any) {
    this.window.$('#categories').val(attr.category_id)
    let data = ServiceEncryptDecriptSimples.encript(JSON.stringify(attr))
    this.router.navigate(['/cadastros/armazem/geral', {information: data}]);
  }

  stringifyThenView(attr: any) {
    //  const data = ServiceEncryptDecriptSimples.encript(JSON.stringify(attr));
    // this.router.navigate(['/cadastros/armazem/todos', {information: data}]);
    ServiceEmitter.get('informacao').emit(attr)
  }

  pdfGenerator() {
    firstValueFrom(new ServiceStorage(this.store).findAll()).then((a: any[]) => {

      let highchartSvg = ServiceUtil.IconGlo;

      let content = [
        [
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NOME', style: 'tableHeader'},
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'ENDEREÇO', style: 'tableHeader'},
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: '', style: 'tableHeader'},
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: '', style: 'tableHeader'},
        ]
      ]

      a.forEach((g) => {
        content.push(
          [
            {margin: [2, 1, 1, 1], fillColor: '#fff', text: g.name, style: 'all'},
            {
              margin: [2, 1, 1, 1],
              fillColor: '#fff',
              text: g.address ? g.address : {text: '-- -- -- --', style: 'span'},
              style: 'all'
            },
            {
              margin: [2, 1, 1, 1],
              fillColor: '#fff',
              text: 'ARMÁRIO',
              style: 'all'
            },
            {
              margin: [2, 1, 1, 1],
              fillColor: '#fff',
              text: 'Nº PRATELEIRA',
              style: 'all'
            }
          ]
        )
        g.ambry.forEach((j: any) => {
          content.push(
            [
              {
                margin: [2, 1, 1, 1],
                fillColor: '#eeeeee',
                bolder: false,
                // @ts-ignore
                text: {text: '|| || || |||| || || |||| || || ||', style: 'span'},
                style: 'allInterno'
              },
              {
                margin: [2, 1, 1, 1],
                fillColor: '#eeeeee',
                bolder: false,
                // @ts-ignore
                text: {text: '|| || || |||| || || |||| || || ||', style: 'span'},
                style: 'allInterno'
              },
              {
                margin: [2, 1, 1, 1],
                fillColor: '#fff',
                text: j.ambry.name,
                style: 'all'
              },
              {
                margin: [2, 1, 10, 1],
                fillColor: '#fff',
                text: j.shelf.length,
                style: 'allR'
              }
            ]
          )
        })

      })

      var dd = {
        content: [
          {
            svg: highchartSvg,
            width: 100,
            height: 30,
            margin: [2, 2, 2, 2]
          },
          {text: 'Lista de Armazens Cadastrados', fontSize: 14, bold: true, margin: [0, 20, 0, 10]},
          {
            style: 'tableExample',
            table: {
              widths: [165, 140, 60, 100],
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
            fontSize: 8,
            color: '#D7DBDD',
            bold: false,
            margin: [0, 20, 0, 0]
          },
          {
            text: 'Autor : ' + this.auth.user.displayName + '',
            fontSize: 8,
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
          allInterno: {
            fontSize: 8,
            alignment: 'justify',
            color: '#515A5A',
          }
          , allR: {
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
      pdf.open();


    })
  }

  downloadBackData() {
    firstValueFrom(new ServiceStorage(this.store).findAll()).then((a: any) => {
      var theJSON = JSON.stringify(a, null, 2);
      var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
      this.downloadJsonHref = uri;

    })
  }

  async find() {
    if (this.isSearch == 'Nome') {
      await this.page.findByFieldContext('name', this.typingName)
    }
  }

  setSearch(attr: string) {
    this.isSearch = attr;
  }
}
