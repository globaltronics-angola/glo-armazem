import {Component, OnInit, NgZone, OnDestroy} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from "@angular/router";

import {Observable, Subscription} from 'rxjs';
import {firstValueFrom} from 'rxjs/internal/firstValueFrom';
import {ServiceEncryptDecriptSimples} from 'src/app/Services/service-encrypt-decript-simples';
import ServiceArticles from 'src/app/Services/ServiceArticles';
import {AuthService} from "../../../../shared/auth.service";
import {StorageService} from "../../../../shared/storage.service";


//@ts-ignore
import * as pdfMake from 'pdfmake';
import moment from 'moment';

//@ts-ignore
import * as FileSaver from 'file-saver';
import * as _ from "lodash"
import ServiceUtil from "../../../../Services/ServiceUtil";
import {PrinterArticlesService} from "./printer-articles.service";
import {StorageServicePaginateService} from "../../../../shared/storage.service.paginate.service";
import {QuerySnapshot, DocumentData} from 'firebase/firestore';


@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.css']
})
export class DataTablesComponent implements OnInit, OnDestroy {

  Article: ServiceArticles;
  private window = (<any>window);
  downloadJsonHref: any = "";
  util: ServiceUtil;
  staticUtil: any = ServiceUtil;
  subscription: any = Subscription;
  totalArticle: number = 0;

  typingName: string = ""
  isSearch: string = "Nome"
  awaitingProcess: boolean = false;
  public page: StorageServicePaginateService


  constructor(private auth: AuthService, private store: StorageService,
              private routeC: ActivatedRoute,
              private ngZone: NgZone, private router: Router,
              public printer: PrinterArticlesService,
              private sanitizer: DomSanitizer,
  ) {

    this.page = new StorageServicePaginateService(this.store, this.auth, ServiceArticles.STORAGE_ARTICLES)
    this.Article = new ServiceArticles(this.store);
    this.util = new ServiceUtil();

    this.page.pageDefault();
  }

  pinterPage() {

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

    this.page.listDataArray.forEach((g, index: number) => {
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
        header: {
          fontSize: 16,
          bold: true
        },
        subheader: {
          fontSize: 14,
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
    pdf.open()

  }

  ngOnDestroy(): void {
    //this.subscription?.unsubscribe()
  }

  setSearch(attr: string) {
    this.isSearch = attr;
  }

  async ngOnInit() {
    (<any>window).InstanceAplication.init()

    await this.page.pageDefault()

    const counter = await this.Article.counterMeth();
    this.totalArticle = counter;

    this.awaitingProcess = true;

  }


  async find() {
    if (this.isSearch == 'Nome') {
      await this.page.findByFieldContext('name', this.typingName)
    }
    if (this.isSearch == 'Ref...') {
      await this.page.findByFieldContext('ean', this.typingName)
    }

    if (this.isSearch == 'Cate...') {
      await this.page.findArrayContains('category_id', this.typingName)
    }
  }


  async edit(attr: any) {
    this.window.$('#categories').val(attr.category_id)
    let data = ServiceEncryptDecriptSimples.encript(JSON.stringify(attr))
    await this.router.navigate(['/cadastros/artigos/geral', {article_instance_select: data}]);

  }

  verifyCate(attr: any) {
    try {
      return attr.split(',').slice(0, 4)
    } catch (e) {
      return attr.slice(0, 4);
    }

  }

  async deleteArticle(attr: any) {

    let Article = new ServiceArticles(this.store);
    Article.Article = attr
    Article.delete()
    await this.page.pageDefault();
  }


  donwladBackData() {

    firstValueFrom(this.Article.findAll()).then((a: any) => {
      var theJSON = JSON.stringify(a, null, 2);
      var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
      this.downloadJsonHref = uri;
    })

  }


}
