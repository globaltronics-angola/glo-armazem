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

@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.css']
})
export class DataTablesComponent implements OnInit, OnDestroy {

  list_articles: any[] = [];

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
  currentKey: any
  prevKeys: any[] = []
  totalArticle: number = 0;
  countAt: number = 0;
  totalPage: number = 0;

  isSearch: string = "Nome"

  constructor(private auth: AuthService, private store: StorageService,
              private routeC: ActivatedRoute,
              private ngZone: NgZone, private router: Router,
              public printer: PrinterArticlesService,
              private sanitizer: DomSanitizer
  ) {
    this.Article = new ServiceArticles(this.store);
    this.util = new ServiceUtil();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  setSearch(attr: string) {
    this.isSearch = attr;
  }

  async ngOnInit() {
    (<any>window).InstanceAplication.init()

    const counter = await this.Article.counterMeth();
    this.totalPage = Math.ceil(counter / this.offset);
    this.totalArticle = counter;

    this.subscription = await this.store.findAllNotLimet(ServiceArticles.STORAGE_ARTICLES).subscribe(
      (resp) => {
        this.list_articles = _.slice(resp.map(this.mapPayload), 0, this.offset)
        this.nextKey = resp[this.offset - 1].payload.doc


       this.currentKey = resp[0].payload.doc
      }
    )


  }

  private mapPayload(e: any): any[] {
    return  e.payload.doc.data()
  }




  async prevPage() {

    const prevKey = _.last(this.prevKeys)
    this.prevKeys = _.dropRight(this.prevKeys)
    this.countAt -= 1

    this.subscription = await this.store.findAllPrev(ServiceArticles.STORAGE_ARTICLES, prevKey, this.nextKey)
      .subscribe(resp => {

        try {
          this.nextKey = resp[resp.length - 1].payload.doc
        } catch (e) {
          this.ngOnInit()
        }


        this.list_articles = _.slice(resp.map(this.mapPayload), 0, this.offset)
      })


  }

  nextPage() {
    this.prevKeys.push(this.currentKey)
    this.getArticles(this.nextKey)
  }


  async find() {

    if (this.isSearch == 'Nome') {

      const list = await this.store.nameSearching(this.typingName, ServiceArticles.STORAGE_ARTICLES).then(e=>{
        this.list_articles = _.slice(e.docs.map(v =>v.data()), 0, this.offset)
          })

    }


    if (this.isSearch == 'Ref...')
      this.subscription = this.store.findAllTest(ServiceArticles.STORAGE_ARTICLES, this.nextKey, this.typingName, '>=', 'ean')
        .subscribe(resp => {

          this.list_articles = _.slice(resp, 0, resp.length)
          this.nextKey = resp[resp.length - 1].payload.doc

        })

    if (this.isSearch == 'Cate...') {

      this.subscription = this.store.findAllTest(ServiceArticles.STORAGE_ARTICLES, this.nextKey, this.typingName, 'array-contains', 'category_id')
        ?.subscribe(resp => {
          this.list_articles = _.slice(resp, 0, resp.length)
          this.nextKey = resp[resp.length - 1].payload.doc
        })


    }

  }


  // @ts-ignore
  getArticles(key?) {
    this.countAt += 1
    this.subscription = this.store.findAllNext(ServiceArticles.STORAGE_ARTICLES, key)
      .subscribe(async resp => {

        console.log(this.totalPage, this.countAt)
        if (this.countAt > (this.totalPage - 2)) {
          this.nextKey = false;
          this.list_articles = _.slice(resp.map(this.mapPayload), 0, this.offset)
          return;
        }

        try {
          this.nextKey = resp[resp.length - 1].payload.doc

        } catch (e) {
          this.ngOnInit()
        }

       this.currentKey = resp[0].payload.doc
       this.list_articles = _.slice(resp.map(this.mapPayload), 0, this.offset)


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
    console.log(attr)
    let Article = new ServiceArticles(this.store);
    Article.Article = attr

    Article.delete()
  }

  print() {

  }

  donwladBackData() {

    firstValueFrom(this.Article.findAll()).then((a: any) => {
      var theJSON = JSON.stringify(a, null, 2);
      var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
      this.downloadJsonHref = uri;
    })

  }

  initDataTabe() {

    this.window.$("#kt_datatable_vertical_scroll").DataTable({
      "scrollY": "500px",
      "scrollCollapse": true,
      "paging": false,
      "dom": "<'table-responsive'tr>",
      "language": {
        "lengthMenu": "Display -- records per page",
        "zeroRecords": "Lista de Artigos",
        "infoEmpty": "Lista de Artigos"
      }
    });
  }


}
