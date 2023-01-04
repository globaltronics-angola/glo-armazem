import { StorageService } from "../shared/storage.service";
import { map } from "rxjs/operators";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export default class ServiceDepartment {

  static STORAGE_NAME: string = "global-departments"



  private window: any = (<any>window)

  IObjectClass:any = {
    id: "NULL",
    name: undefined,
    details: undefined,
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL"
  }

  constructor(private store: StorageService) {
    let user = new ServiceUtil().getSession()

    this.IObjectClass.user = user;
  }


  findAll() {
    return this.store.findAll(ServiceDepartment.STORAGE_NAME).pipe(
      map(this.convertToArticle)
    )
  }

  save(): void {

    if (!this.IObjectClass.updated_mode) {
      this.IObjectClass.id = this.store.getId().toUpperCase();
      this.IObjectClass.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    }

    this.IObjectClass.updated_mode = false;

    this.store.createdForceGenerateId(this.IObjectClass, ServiceDepartment.STORAGE_NAME)
      .then(
        () => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
          this.IObjectClass.name = undefined
          this.IObjectClass.details = undefined
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


  public delete() {
    this.store.deleted(ServiceDepartment.STORAGE_NAME, this.IObjectClass.id).then(() => {
      this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE)
    });
  }


}
