import {Component, NgZone, OnInit} from '@angular/core';
import ServiceFornecedor from "../../../../Services/ServiceFornecedor";
import {StorageService} from "../../../../shared/storage.service";
import {firstValueFrom, Observable} from 'rxjs';
import ServiceUtil from "../../../../Services/ServiceUtil";
import {ServiceEncryptDecriptSimples} from "../../../../Services/service-encrypt-decript-simples";
import {Router} from "@angular/router";
import moment from "moment";
//@ts-ignore
import * as pdfMake from "pdfmake";
import {AuthService} from "../../../../shared/auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {StorageServicePaginateService} from "../../../../shared/storage.service.paginate.service";
import ServiceClients from "../../../../Services/ServiceClients";
import ServiceMovimento from "../../../../Services/ServiceMovimento";

@Component({
  selector: 'app-datatable-fornecedores',
  templateUrl: './datatable-fornecedores.component.html',
  styles: []
})
export class DatatableFornecedoresComponent implements OnInit {

  list_forncedors: any[] = []
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
    this.page = new StorageServicePaginateService(this.store, this.auth, ServiceFornecedor.STORAGE_NAME)
  }


  async ngOnInit() {
    this.window.InstanceAplication.init()
    await this.page.pageDefault();
    this.pageTotal = await this.page.getCounterInfo()
    this.awaitingProcess = true;
  }

  deleteFornecedor(attr: any) {
    let Obj: ServiceFornecedor = new ServiceFornecedor(this.store);
    Obj.IObjectClass = attr;
    Obj.delete()
  }

  async listFornecedor() {
  }

  editFornecedor(attr: any) {
    this.window.$('#categories').val(attr.category_id)
    let data = ServiceEncryptDecriptSimples.encript(JSON.stringify(attr))
    this.router.navigate(['/cadastros/fornecedor/geral', {information: data}]);
  }

  pdfGenerator() {
    firstValueFrom(new ServiceFornecedor(this.store).findAll()).then((a: any[]) => {
      let highchartSvg = ServiceUtil.IconGlo;

      let content = [
        [
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NOME', style: 'tableHeader'},
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'NIF / BI', style: 'tableHeader'},
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: 'TIPO', style: 'tableHeader'},
          {margin: [2, 1, 1, 1], fillColor: '#eeeeee', text: ('Contacto').toUpperCase(), style: 'tableHeader'},
        ]
      ]

      a.forEach((g) => {
        content.push([
          {margin: [2, 1, 1, 1], fillColor: '#fff', text: g.name, style: 'all'},
          {
            margin: [2, 1, 1, 1],
            fillColor: '#fff',
            text: g.identityClient ? g.identityClient : {text: '-- -- -- --', style: 'span'},
            style: 'all'
          },
          {
            margin: [2, 1, 1, 1],
            fillColor: '#fff',
            text: g.type ? (g.type == 1 ? 'Individual' : 'Colectivo') : {text: '-- -- -- --', style: 'span'},
            style: 'all'
          },
          {
            margin: [2, 1, 1, 1],
            fillColor: '#fff',
            text: g.phoneNumber ? g.phoneNumber.split(',')[0] : {text: '-- -- --', style: 'span'},
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
            margin: [2, 2, 2, 2]
          },
          {text: 'Lista de Fornecedores Cadastrados', fontSize: 14, bold: true, margin: [0, 20, 0, 10]},
          {
            style: 'tableExample',
            table: {
              widths: [150, 120, 90, 115],
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
    firstValueFrom(new ServiceFornecedor(this.store).findAll()).then((a: any) => {
      var theJSON = JSON.stringify(a, null, 2);
      var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
      this.downloadJsonHref = uri;

    })
  }

  async find() {
    if (this.isSearch == 'Nome') {
      await this.page.findByFieldContext('name', this.typingName)
    }
    if (this.isSearch == 'Tipo...') {
      if (this.typingName.toLowerCase() == 'colectivo' || this.typingName.toLowerCase() == 'coletivo')
        await this.page.findByFieldContext('type', '2')
      else if (this.typingName.toLowerCase() == 'individual')
        await this.page.findByFieldContext('type', '1')

    }

    if (this.isSearch == 'Nif...') {
      await this.page.findByFieldContext('identityClient', this.typingName)
    }
  }

  setSearch(attr: string) {
    this.isSearch = attr;
  }
}
