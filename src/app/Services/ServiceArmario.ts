import { StorageService } from "../shared/storage.service";
import { map, tap } from "rxjs/operators";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import { Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";
import ServiceStorage from "./ServiceStorage";


@Injectable({
  providedIn: 'root'
})
export default class ServiceArmario {

  static STORAGE_NAME: string = "global-ambry"
  static STORAGE_SHELF: string = "global-shelf"

  private window: any = (<any>window)

  IObjectClass = {
    id: "NULL",
    name: "",
    storage: {},
    storage_id: "NULL",
    shelf: [],
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL"
  };

  IObjectPrateleira = {
    id: "NULL",
    name: undefined,
    ambry: this.IObjectClass,
    ambry_id: "NULL",
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL"
  };

  constructor(private store: StorageService) { }


  findAll() {
    return this.store.findAll(ServiceArmario.STORAGE_NAME).pipe(
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

    this.IObjectClass.updated_mode = false;

    this.store.createdForceGenerateId(this.IObjectClass, ServiceArmario.STORAGE_NAME)
      .then(
        () => {


          this.IObjectClass.shelf.forEach((e) => {
            this.shelf(e)
          })

          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
          // this.IObjectClass.name = undefined
        },
        err => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR)
        }
      )

  }

  shelf(a: any): void {

    let shelf = this.IObjectPrateleira;
    shelf.id = ((a).toUpperCase() + '-' + this.IObjectClass.id).toUpperCase();
    shelf.ambry = this.IObjectClass;
    shelf.ambry_id = this.IObjectClass.id;
    shelf.name = (a).toUpperCase();

    this.store.createForceMyId(shelf, ServiceArmario.STORAGE_SHELF).then(() => { })

  }



  convertToArticle(resp: any) {
    return resp.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;

      return data;
    })
  }


  public delete() {
    this.store.deleted(ServiceArmario.STORAGE_NAME, this.IObjectClass.id).then(() => {
      this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE)
    });
  }

  public async findById(id: string) {
    return await firstValueFrom(this.store.findById(ServiceArmario.STORAGE_NAME, id)
      .pipe(tap(val => {
        return val
      })))
  }

  public async findByName(id: any) {

    if (id) {

      const article = JSON.parse(id.toString())
      const list = await this.store.findByOther(ServiceArmario.STORAGE_NAME, 'storage_id', article.id);
      return list
    }

    return []
  }

  public async findByIdAndName(id: any) {

    if (id) {

      const storage = JSON.parse(id.toString())
      const list = await this.store.findByOther(ServiceArmario.STORAGE_NAME, 'storage', storage);
      return list
    }

    return []
  }


}
