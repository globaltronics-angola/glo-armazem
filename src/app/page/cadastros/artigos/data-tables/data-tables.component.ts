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
    console.log(attr)
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
