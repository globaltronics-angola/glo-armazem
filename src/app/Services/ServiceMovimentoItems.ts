import { StorageService } from "../shared/storage.service";
import { map } from "rxjs/operators";
import * as moment from "moment";
import ServiceUtil from "./ServiceUtil";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export default class ServiceMovimentoItems {

  static STORAGE_NAME: string = "global-move-items"



  private window: any = (<any>window)

  oItem = {
    id: "NULL",
    article: undefined,
    localStorage: "NULL",
    financialCost: "NULL",
    localCurrency: undefined,
    quantity: undefined,
    conversion: undefined,
    dateOfPurchase: undefined,
    provider: undefined,
    others: undefined,
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL",
    status: false,
    moveType: "NULL",
  }

  constructor(private store: StorageService) { }


  findAll() { return this.store.findAll(ServiceMovimentoItems.STORAGE_NAME).pipe(map(this.convertToArticle)) }

  save(): void {

    if (!this.oItem.updated_mode) { this.oItem.created_at = moment().format('DD MM,YYYY HH:mm:ss') }
    if (!this.oItem.id) { this.oItem.id = this.store.getId().toUpperCase(); }

    this.oItem.updated_mode = false;

    this.store.createdForceGenerateId(this.oItem, ServiceMovimentoItems.STORAGE_NAME)
      .then(() => { this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS) },
        err => { this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR) })

  }


  convertToArticle(resp: any) { return resp.map((e: any) => { return e.payload.doc.data(); }) }

}
