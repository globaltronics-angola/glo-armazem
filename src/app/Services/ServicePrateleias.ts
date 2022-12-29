import { StorageService } from "../shared/storage.service";
import { map, tap } from "rxjs/operators";
import * as moment from "moment";
import ServiceUtil from "./ServiceUtil";
import { Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export default class ServicePrateleias {

  static STORAGE_NAME: string = "global-shelf"

  private window: any = (<any>window)

  IObjectClass = {
    id: "NULL",
    name: undefined,
    ambry: {},
    ambry_id: "NULL",
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL"
  };


  constructor(private store: StorageService) { }


  findAll() {
    return this.store.findAll(ServicePrateleias.STORAGE_NAME).pipe(
      map(this.convertToArticle)
    )
  }

  save(): void {

    if (!this.IObjectClass.updated_mode) {
      this.IObjectClass.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    }

    this.IObjectClass.updated_mode = false;

    this.store.createdForceGenerateId(this.IObjectClass, ServicePrateleias.STORAGE_NAME)
      .then(
        () => { this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS) },
        err => { this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR) }
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
    this.store.deleted(ServicePrateleias.STORAGE_NAME, this.IObjectClass.id).then(() => {
      this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE)
    });
  }

  public async findById(id: string) {
    return await firstValueFrom(this.store.findById(ServicePrateleias.STORAGE_NAME, id)
      .pipe(tap(val => {
        return val
      })))
  }

  public async findByName(id: any) {

    if (id) {

      const article = JSON.parse(id.toString())
      const list = await this.store.findByOther(ServicePrateleias.STORAGE_NAME, 'storage_id', article.id);
      return list
    }

    return []
  }

  public async findByIdAndName(id: any) {

    if (id) {

      const storage = JSON.parse(id.toString())
      const list = await this.store.findByOther(ServicePrateleias.STORAGE_NAME, 'ambry', storage);
      return list
    }

    return []
  }


}
