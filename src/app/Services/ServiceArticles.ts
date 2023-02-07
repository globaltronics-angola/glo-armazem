import {StorageService} from "../shared/storage.service";
import {map} from "rxjs/operators";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import {Injectable} from '@angular/core';
import {firstValueFrom} from "rxjs";
import ServiceMovimento from "./ServiceMovimento";
import {serverTimestamp} from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export default class ServiceArticles {

  static STORAGE_ARTICLES: string = "global-articles"
  static STORAGE_RECYCLER: string = "global-recycling"


  private window: any = (<any>window)

  Article: any = {
    id: "NULL",
    name: undefined,
    model: "",
    marquee: "",
    ean: "",
    category_id: "",
    details: "",
    quantity: 0,
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL",
    timestamp: "" + new Date().getTime(),
    updatedAt: serverTimestamp()
  }

  constructor(private store: StorageService) {
    let user = new ServiceUtil().getSession()

    this.Article.user = user;


  }


  findAll() {
    return this.store.findAll(ServiceArticles.STORAGE_ARTICLES).pipe(
      map(this.convertToArticle)
    )
  }

  counterMeth() {
    return this.store.getCounterInfo(ServiceArticles.STORAGE_ARTICLES);
  }

  save() {

    if (!this.Article.updated_mode) {
      this.Article.id = this.store.getId().toUpperCase();
      this.Article.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    }

    this.Article.timestamp = "" + new Date().getTime() + this.Article.id
    this.Article.updated_mode = false;

    this.store.createdForceGenerateId(this.Article, ServiceArticles.STORAGE_ARTICLES)
      .then(
        (e) => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)

        },
        err => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR)
        }
      )

    return this.Article;
  }


  convertToArticle(resp: any) {
    return resp.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;

      return data;
    })
  }

  delete() {


    this.store.deleted(ServiceArticles.STORAGE_ARTICLES, this.Article.id).then(() => {
      this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE)
    });


  }


  async set(articleID: any) {
    await firstValueFrom(this.store.findById(ServiceArticles.STORAGE_ARTICLES, articleID)).then(async (article: any) => {
      this.Article.id = article.id
      this.Article.name = article.name
      this.Article.category_id = article.category_id
      this.Article.model = article.model
      this.Article.marquee = article.marquee
      this.Article.ean = article.ean
      this.Article.details = article.details
    })
    this.window.category_id = await this.Article.category_id
    //await this.window.$('#categories').val(this.Article.category_id)

    this.Article.updated_mode = true;
  }

  static async searchingArticle(attr: any, store: StorageService) {
    let listArticle: any[] = [];
    await store.getForeStore().collection(ServiceMovimento.STORAGE_EXIST_ITEM)
      .where('localStorageId', '==', attr)
      //.where('quantity', '!=', '0')
      .get()
      .then(snap => {
        snap.forEach(doc => {
          listArticle.push(doc.data())
          return doc.data();
        });
      });
    return listArticle;
  }
}
