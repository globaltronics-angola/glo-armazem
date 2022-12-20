import { StorageService } from "../shared/storage.service";
import { map } from "rxjs/operators";
import * as moment from "moment";
import ServiceUtil from "./ServiceUtil";


export default class ServiceCategories {

  static STORAGE_CATEGORIES: string = "global-categories-article";

  Categories = {
    id: "NULL",
    name: undefined,
    details: undefined,
    category_id: undefined,
    created_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    deleted_at: "NULL",
    email_auth: "NULL"
  }

  private window: any = (<any>window)


  constructor(private store: StorageService) { }

  public findAll() {
    return this.store.findAll(ServiceCategories.STORAGE_CATEGORIES)
      .pipe(map(this.convertToCategories))
  }

  public save(): void {

    this.Categories.id = this.store.getId().toUpperCase();
    this.store.createdForceGenerateId(this.Categories, ServiceCategories.STORAGE_CATEGORIES)
      .then(() => {
        this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
      }, err => {
        this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR)
      })

  }


  private convertToCategories(resp: any) {
    return resp.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;
      return data;
    })
  }

}
