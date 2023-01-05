import { StorageService } from "../shared/storage.service";
import { firstValueFrom } from "rxjs";
import { map } from "rxjs/operators";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export default class ServiceModelArticle {

  static STORAGE_MODEL: string = "global-model-article";

  Model:any = {
    id: "NULL",
    name: undefined,
    details: "",
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL"
  }

  private window: any = (<any>window)


  constructor(private store: StorageService) {
    let user = new ServiceUtil().getSession()

    this.Model.user = user;

  }

  public findAll() {
    return this.store.findAll(ServiceModelArticle.STORAGE_MODEL)
      .pipe(map(this.convertToModel))
  }

  public save(): void {

    if (!this.Model.updated_mode) {
      this.Model.id = this.store.getId().toUpperCase();
      this.Model.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    }

    this.Model.updated_mode = false;

    this.store.createdForceGenerateId(this.Model, ServiceModelArticle.STORAGE_MODEL)
      .then(
        () => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
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

  public delete(){
    this.store.deleted(ServiceModelArticle.STORAGE_MODEL, this.Model.id).then(
      () => {
        this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE)
      }
    )

  }


}
