import { StorageService } from "../shared/storage.service";
import { map } from "rxjs/operators";
import  moment from "moment";
import ServiceUtil from "./ServiceUtil";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export default class ServiceTipos {

  static STORAGE_CATEGORIES: string = "global-type-service";


  OO = {
    id: "NULL",
    name: undefined,
    details: undefined,
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL"
  }

  private window: any = (<any>window)


  constructor(private store: StorageService) { }

  public findAll() {
    return this.store.findAll(ServiceTipos.STORAGE_CATEGORIES)
      .pipe(map(this.convertToCategories))
  }

  public save(): void {

    if (!this.OO.updated_mode) {
      this.OO.id = this.store.getId().toUpperCase();
      this.OO.created_at = moment().format('DD MM,YYYY HH:mm:ss');
    }

    this.OO.updated_mode = false;

    this.store.createdForceGenerateId(this.OO, ServiceTipos.STORAGE_CATEGORIES)
      .then(() => {
        this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
        this.OO.name = undefined;
        this.OO.details = undefined;

      }, err => {
        this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR)
      })

  }


  public delete() {
    this.store.deleted(ServiceTipos.STORAGE_CATEGORIES, this.OO.id).then(() => {
      this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE)
    });
  }


  private convertToCategories(resp: any) {
    return resp.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;
      return data;
    })
  }

}
