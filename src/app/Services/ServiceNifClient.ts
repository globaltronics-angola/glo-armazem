import { StorageService } from "../shared/storage.service";
import { map } from "rxjs/operators";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export default class ServiceNifClient {

  static STORAGE_NAME: string = "global-nif-clients"

  private window: any = (<any>window)

  IObjectClass:any = {
    id: "NULL",
    nif: "",
    client: undefined,
    country: undefined,
    address: undefined,
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
    return this.store.findAll(ServiceNifClient.STORAGE_NAME).pipe(
      map(this.convertToArticle)
    )
  }

  save(): void {

    if (!this.IObjectClass.updated_mode) { this.IObjectClass.created_at = moment().format('DD MM,YYYY HH:mm:ss') }

    if (this.IObjectClass.id === "NULL") { this.IObjectClass.id = this.store.getId().toUpperCase(); }

    this.IObjectClass.updated_mode = false;

    this.store.createdForceGenerateId(this.IObjectClass, ServiceNifClient.STORAGE_NAME)
      .then(
        () => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
          this.IObjectClass.nif = ""
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
    this.store.deleted(ServiceNifClient.STORAGE_NAME, this.IObjectClass.id).then(() => {
      this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE)
    });
  }

  async findByArticleId(id: string) {

    const client = JSON.parse(id.toString())

    const list = await this.store.findByOther(ServiceNifClient.STORAGE_NAME, 'client', client);

    return list
  }


}
