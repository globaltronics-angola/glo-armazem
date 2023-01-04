import { StorageService } from "../shared/storage.service";
import { map } from "rxjs/operators";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export default class ServiceArticles {

  static STORAGE_ARTICLES: string = "global-articles"



  private window: any = (<any>window)

  Article: any = {
    id: "NULL",
    name: undefined,
    model_id: "NULL",

    category_id: "NULL",

    details: undefined,
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL"
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

  save(): void {

    if (!this.Article.updated_mode) {
      this.Article.id = this.store.getId().toUpperCase();
      this.Article.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    }

    this.Article.updated_mode = false;

    this.store.createdForceGenerateId(this.Article, ServiceArticles.STORAGE_ARTICLES)
      .then(
        () => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
          this.Article.name = undefined
          this.Article.model_id = "NULL";
          this.Article.category_id = "NULL";
          this.Article.details = undefined
        },
        err => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR)
        }
      )

  }


  convertToArticle(resp: any) {
    return resp.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;

      return data;
    })
  }




}
