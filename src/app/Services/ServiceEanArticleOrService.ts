import { StorageService } from "../shared/storage.service";
import { map, tap, switchMap } from "rxjs/operators";
import { firstValueFrom, Observable, Subscription } from "rxjs";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import { Injectable, OnDestroy } from "@angular/core";



@Injectable({
  providedIn: 'root'
})

export default class ServiceEanArticleOrService implements OnDestroy {

  static STORAGE_NAME: string = "global-ean-reference";
  STORAGE_UNITY_ARTICLE: string = "global-unity-ean-article";

  IObjectClass: any  = {
    id: "NULL",
    ean: "",
    unity_id: "NULL",
    type_id: "NULL",
    country_id: "NULL",
    quantity: "NULL",
    conversion: "NULL",
    article_id: "NULL",
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL"
  }

  private window: any = (<any>window)
  snKnow: Subscription | undefined

  constructor(private store: StorageService) {
    let user = new ServiceUtil().getSession()

    this.IObjectClass.user = user;
   }

  ngOnDestroy(): void {
    this.snKnow?.unsubscribe();
  }

  public findAll() {
    return this.store.findAll(ServiceEanArticleOrService.STORAGE_NAME).pipe(
      map(this.convertToModel))
  }

  public findArticles() {
    const res= this.store.findByDifferenceName(ServiceEanArticleOrService.STORAGE_NAME, 'type_id', 'NULL');
    console.log({res});
    return res

  }

  public save(): void {

    if (!this.IObjectClass.updated_mode) { this.IObjectClass.created_at = moment().format('DD MM,YYYY HH:mm:ss') }

    this.IObjectClass.id = this.IObjectClass.ean
    this.IObjectClass.updated_mode = false;

    this.store.createdForceGenerateId(this.IObjectClass, ServiceEanArticleOrService.STORAGE_NAME)
      .then(() => { this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS) },
        err => { this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR) })

  }


  convertToModel(resp: any) { return resp.map((e: any) => { return e.payload.doc.data(); }) }

  public delete() {
    this.store.deleted(ServiceEanArticleOrService.STORAGE_NAME, this.IObjectClass.id)
      .then(() => { this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE) })
  }

  async findByArticleId(id: any) {

    if (id) {
      const article = JSON.parse(id.toString()).id
      const list = await this.store.findByOther(ServiceEanArticleOrService.STORAGE_NAME, 'article_id', article);
      return list
    }

    console.log(id)
    return []
  }


}
