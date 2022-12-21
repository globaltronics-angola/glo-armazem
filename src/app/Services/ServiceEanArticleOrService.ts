import { StorageService } from "../shared/storage.service";
import { map, tap, switchMap } from "rxjs/operators";
import { firstValueFrom, Subscription } from "rxjs";
import * as moment from "moment";
import ServiceUtil from "./ServiceUtil";
import { Injectable, OnDestroy } from "@angular/core";



@Injectable({
  providedIn: 'root'
})

export default class ServiceEanArticleOrService implements OnDestroy {

  static STORAGE_NAME: string = "global-ean-reference";
  STORAGE_UNITY_ARTICLE: string = "global-unity-ean-article";

  IObjectClass = {
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

  constructor(private store: StorageService) { }

  ngOnDestroy(): void {
    this.snKnow?.unsubscribe();
  }

  public findAll() {
    return firstValueFrom(this.store.findAll(ServiceEanArticleOrService.STORAGE_NAME)
      .pipe(map(this.convertToModel)))
  }



  public save(): void {

    if (!this.IObjectClass.updated_mode) {

      this.IObjectClass.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    }

    this.IObjectClass.id = this.IObjectClass.ean
    this.IObjectClass.updated_mode = false;

    this.store.createdForceGenerateId(this.IObjectClass, ServiceEanArticleOrService.STORAGE_NAME)
      .then(
        () => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
        },
        err => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR)
        }
      )

  }


  convertToModel(resp: any) {
    return resp.map((e: any) => {

      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;





      return data;
    })
  }

  public delete() {
    this.store.deleted(ServiceEanArticleOrService.STORAGE_NAME, this.IObjectClass.id).then(
      () => {
        this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE)
      }
    )
  }


}
