````ts
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

@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.css']
})
export class DataTablesComponent implements OnInit, OnDestroy {

  list_articles: any[] = [];
  list_articles2: Observable<any>;
  Article: ServiceArticles;
  private window = (<any>window);
  downloadJsonHref: any = "";

  util: ServiceUtil;

  staticUtil: any = ServiceUtil;

  subscription: any = Subscription;
  mappingPaginate: any[] = []
  private firstInResponse: any;
  private lastInResponse: any = [];
  nestPage: boolean = true;
  staticPage: any = {}

  active: number = -1;
  typingName: string = ""
  offset = 10;
  nextKey: any
  prevKeys: any[] = []
  totalArticle: number = 0;
  countAt: number = 0;
  totalPage: number = 0;

  isSerach: string = "Nome"

  constructor(private auth: AuthService, private store: StorageService, private routeC: ActivatedRoute,
              private ngZone: NgZone, private router: Router,
              private sanitizer: DomSanitizer) {
    this.Article = new ServiceArticles(this.store);
    this.util = new ServiceUtil();
    this.list_articles2 = this.Article.findAll();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  setSearch(attr: string) {
    this.isSerach = attr;
  }

  async ngOnInit() {
    (<any>window).InstanceAplication.init()

    await firstValueFrom(this.list_articles2).then(rest => {
      this.totalArticle = rest.length
      this.totalPage = Math.ceil(this.totalArticle / this.offset);
    })

    this.subscription = this.store.findAll(ServiceArticles.STORAGE_ARTICLES).subscribe(
      (resp) => {
        this.list_articles = _.slice(resp, 0, this.offset)
        this.nextKey = resp[this.offset - 1].payload.doc
      }
    )
  }

  prevPage() {
    // console.log(this.prevKeys);
    const prevKey = _.last(this.prevKeys)
    this.prevKeys = _.dropRight(this.prevKeys)

    this.subscription = this.store.findAllPrev(ServiceArticles.STORAGE_ARTICLES, prevKey, this.nextKey)
      .subscribe(resp => {
        this.countAt -= 1
        this.list_articles = _.slice(resp, 0, this.offset)
        try {
          this.nextKey = resp[resp.length - 1].payload.doc
        } catch (e) {

        }

      })

  }

  nextPage() {
    this.prevKeys.push(this.list_articles[0].payload.doc)
    this.getArticles(this.nextKey)
  }

  async find() {

    if (this.isSerach == 'Nome')
      this.subscription = await this.store.findAllTest(ServiceArticles.STORAGE_ARTICLES, this.nextKey, this.typingName, '>=', 'name')
        .subscribe(resp => {

          this.list_articles = _.slice(resp, 0, this.offset)
          this.nextKey = resp[resp.length - 1].payload.doc

        })


    if (this.isSerach == 'Ref...')
      this.subscription = this.store.findAllTest(ServiceArticles.STORAGE_ARTICLES, this.nextKey, this.typingName, '>=', 'ean')
        .subscribe(resp => {

          this.list_articles = _.slice(resp, 0, this.offset)
          this.nextKey = resp[resp.length - 1].payload.doc

        })

    if (this.isSerach == 'Cate...') {

      this.subscription = this.store.findAllTest(ServiceArticles.STORAGE_ARTICLES, this.nextKey, this.typingName, 'array-contains', 'category_id')
        ?.subscribe(resp => {
          this.list_articles = _.slice(resp, 0, this.offset)
          this.nextKey = resp[resp.length - 1].payload.doc
        })


    }

  }


  // @ts-ignore
  getArticles(key?) {

    this.subscription = this.store.findAllNext(ServiceArticles.STORAGE_ARTICLES, key)
      .subscribe(async resp => {

        this.countAt += 1
        // console.log(this.totalPage, this.countAt)
        if (this.countAt > (this.totalPage - 2)) {
          this.nextKey = false;
          this.list_articles = _.slice(resp, 0, this.offset)
          return;
        }

        this.list_articles = _.slice(resp, 0, this.offset)
        this.nextKey = resp[this.offset - 1].payload.doc


      })
  }

  edit(attr: any) {
    this.window.$('#categories').val(attr.category_id)
    let data = ServiceEncryptDecriptSimples.encript(JSON.stringify(attr))
    this.router.navigate(['/cadastros/artigos/geral', {article_instance_select: data}]);
  }

  verifyCate(attr: any) {
    try {
      return attr.split(',').slice(0, 4)
    } catch (e) {
      return attr.slice(0, 4);
    }

  }

  deleteArticle(attr: any) {
    // console.log(attr)
    let Article = new ServiceArticles(this.store);
    Article.Article = attr

    Article.delete()
  }

  print() {

  }

  donwladBackData() {

    firstValueFrom(this.list_articles2).then((a: any) => {
      var theJSON = JSON.stringify(a, null, 2);
      var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
      this.downloadJsonHref = uri;
    })

  }


  pdfGenerator() {

    firstValueFrom(this.list_articles2).then((a: any[]) => {
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
            
            color: '#E6B0AA'
          },
          table: {
            width: '1000px'
          },
          all: {
            fontSize: 9,
            
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


  xlsFile() {

    /*firstValueFrom(this.list_articles).then((a: any) => {
      const blob = new Blob([JSON.stringify(a)], {type: 'application/vnd.ms-excel;charset=utf-8'});
      FileSaver.saveAs(blob, "Artigos.xls");
    })*/


  }
}

````
