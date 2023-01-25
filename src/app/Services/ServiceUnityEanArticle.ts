import { StorageService } from "../shared/storage.service";
import { map, tap } from "rxjs/operators";
import { firstValueFrom } from "rxjs";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import { Injectable } from "@angular/core";
import {serverTimestamp} from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})

export default class ServiceUnityEanArticle {

  static STORAGE_NAME: string = "global-unity-ean-article";

  IObjectClass:any = {
    id: "NULL",
    name: undefined,
    acronym: undefined,
    details: "",
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL",
    updatedAt: serverTimestamp()
  }

  private window: any = (<any>window)


  constructor(private store: StorageService) {
    let user = new ServiceUtil().getSession()
    this.IObjectClass.user = user;
  }

  public findAll() {
    return this.store.findAll(ServiceUnityEanArticle.STORAGE_NAME)
      .pipe(map(this.convertToModel))
  }

  public save(): void {

    if (!this.IObjectClass.updated_mode) {
      this.IObjectClass.id = this.store.getId().toUpperCase();
      this.IObjectClass.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    }
    this.IObjectClass.timestamp = "" + new Date().getTime() + this.IObjectClass.id
    this.IObjectClass.updated_mode = false;

    this.store.createdForceGenerateId(this.IObjectClass, ServiceUnityEanArticle.STORAGE_NAME)
      .then(
        () => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
          this.IObjectClass.name = undefined
          this.IObjectClass.details = ""
        },
        err => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR)
        }
      )

  }


  private convertToModel(resp: any) {
    return resp.map((e: any) => {

      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;

      return data;
    })
  }

  public delete() {
    this.store.deleted(ServiceUnityEanArticle.STORAGE_NAME, this.IObjectClass.id).then(
      () => {
        this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE)
      }
    )
  }

  public async findById(id: string) {
    return await firstValueFrom(this.store.findById(ServiceUnityEanArticle.STORAGE_NAME, id).pipe(tap(val => {
      return val
    })))
  }



}
