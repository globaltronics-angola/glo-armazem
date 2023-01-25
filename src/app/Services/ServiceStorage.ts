import {StorageService} from "../shared/storage.service";
import {map} from "rxjs/operators";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import {Injectable} from '@angular/core';
import {serverTimestamp} from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export default class ServiceStorage {

  static STORAGE_NAME: string = "global-storage";

  private window: any = (<any>window)

  IObjectClass: any = {
    id: "NULL",
    name: undefined,
    address: "",
    ambry: [],
    details: "",
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL",
    updatedAt: serverTimestamp()
  }

  constructor(private store: StorageService) {
    let user = new ServiceUtil().getSession()
    this.IObjectClass.user = user.displayName;
    this.IObjectClass.email_auth = user.email;
  }


  findAll() {
    return this.store.findAll(ServiceStorage.STORAGE_NAME).pipe(
      map(this.convertToArticle)
    )
  }

  save(): void {

    if (!this.IObjectClass.updated_mode) {
      this.IObjectClass.id = this.store.getId().toUpperCase();
      this.IObjectClass.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    }


    this.IObjectClass.timestamp = "" + new Date().getTime() + this.IObjectClass.id
    this.IObjectClass.updated_mode = false;

    this.store.createdForceGenerateId(this.IObjectClass, ServiceStorage.STORAGE_NAME)
      .then(
        () => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
          this.IObjectClass.name = undefined
          this.IObjectClass.details = ""
        },
        err => {
          this.window.sentMessageError.init(ServiceUtil.MESSAGE_ERROR)
        }
      )

  }

  saveCabinetsAndShelves() {

  }


  convertToArticle(resp: any) {
    return resp.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;

      return data;
    })
  }


  public delete() {
    this.store.deleted(ServiceStorage.STORAGE_NAME, this.IObjectClass.id).then(() => {
      this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE)
    });
  }


}
