import { StorageService } from "../shared/storage.service";
import { firstValueFrom } from "rxjs";
import { map } from "rxjs/operators";
import * as moment from "moment";
import ServiceUtil from "./ServiceUtil";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class ServiceArticles {

  static STORAGE_ARTICLES: string = "global-articles"

  Article = {
    id: "NULL",
    name: undefined,
    model_id: undefined,
    category_id: undefined,
    details: undefined,

    created_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    deleted_at: "NULL",
    email_auth: "NULL"
  }

  private window: any = (<any>window)


  constructor(private store: StorageService) { }

  async findAll() {
    return await firstValueFrom(this.store.findAll(ServiceArticles.STORAGE_ARTICLES).pipe(
      map(this.convertToArticle)
    ))
  }




  save(): void {

    this.Article.id = this.store.getId().toUpperCase();
    this.store.createdForceGenerateId(this.Article, ServiceArticles.STORAGE_ARTICLES)
      .then(
        () => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
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
