import { StorageService } from "../shared/storage.service";
import { firstValueFrom } from "rxjs";
import { map } from "rxjs/operators";
import * as moment from "moment";
import ServiceUtil from "./ServiceUtil";


export default class ServiceModelArticle {

  static STORAGE_MODEL: string = "global-model-article";


  Model = {
    id: "NULL",
    name: undefined,
    details: undefined,

    created_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    deleted_at: "NULL",
    email_auth: "NULL"
  }

  private window: any = (<any>window)


  constructor(private store: StorageService) { }

  public async findAll() {
    return await firstValueFrom(this.store.findAll(ServiceModelArticle.STORAGE_MODEL).pipe(
      map(this.convertToModel)
    ))


  }

  public save(): void {

    this.Model.id = this.store.getId().toUpperCase();
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




}
