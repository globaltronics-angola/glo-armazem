import { StorageService } from "../shared/storage.service";
import { map } from "rxjs/operators";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export default class ServiceCategories {

  static STORAGE_CATEGORIES: string = "global-categories-article";

  Categories: any = {
    id: "NULL",
    name: undefined,
    details: undefined,
    category_id: "NULL",
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL"
  }

  private window: any = (<any>window)


  constructor(private store: StorageService) {
    let user = new ServiceUtil().getSession()

    this.Categories.user = user;

   }

  public findAll() {
    return this.store.findAll(ServiceCategories.STORAGE_CATEGORIES)
      .pipe(map(this.convertToCategories))
  }

  public save(): void {

    if (!this.Categories.updated_mode) {
      this.Categories.id = this.store.getId().toUpperCase();
      this.Categories.created_at = moment().format('DD MM,YYYY HH:mm:ss');
    }

    this.Categories.updated_mode = false;

    this.store.createdForceGenerateId(this.Categories, ServiceCategories.STORAGE_CATEGORIES)
      .then(() => {
        this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
        this.Categories.name = undefined;
        this.Categories.details = undefined;

      }, err => {
        this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR)
      })

  }


  public delete() {
    this.store.deleted(ServiceCategories.STORAGE_CATEGORIES, this.Categories.id).then(() => {
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
