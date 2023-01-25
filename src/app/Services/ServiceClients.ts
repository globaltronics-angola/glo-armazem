import {StorageService} from "../shared/storage.service";
import {map} from "rxjs/operators";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import {Injectable} from '@angular/core';
import {serverTimestamp} from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export default class ServiceClients {

  static STORAGE_NAME: string = "global-clients"
  private window: any = (<any>window)

  IObjectClass: any = {
    id: "",
    name: undefined,
    identityClient: "",
    details: "",
    type: undefined,
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL",
    updatedAt: serverTimestamp()
  }

  constructor(private store: StorageService) {
    let user = new ServiceUtil().getSession()

    this.IObjectClass.user = user;
  }


  findAll() {
    return this.store.findAll(ServiceClients.STORAGE_NAME).pipe(
      map(this.convertToArticle)
    )
  }

  save(): void {

    if (!this.IObjectClass.updated_mode) {

      this.IObjectClass.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    }

    if (!this.IObjectClass.id) {
      this.IObjectClass.id = this.store.getId().toUpperCase();
    }

    this.IObjectClass.timestamp = "" + new Date().getTime() + this.IObjectClass.id
    this.IObjectClass.updated_mode = false;

    this.store.createdForceGenerateId(this.IObjectClass, ServiceClients.STORAGE_NAME)
      .then(
        () => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
          this.IObjectClass = {}
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
    this.store.deleted(ServiceClients.STORAGE_NAME, this.IObjectClass.id).then(() => {
      this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE)
    });
  }


}
