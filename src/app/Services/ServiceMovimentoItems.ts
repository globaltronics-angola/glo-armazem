import { StorageService } from "../shared/storage.service";
import { map } from "rxjs/operators";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export default class ServiceMovimentoItems {

  static STORAGE_NAME: string = "global-move-items"



  private window: any = (<any>window)

  oItem: any = {
    id: "NULL",
    article: undefined,
    localStorage: "",
    localAmbry: "",
    localShelf: "",
    financialCost: "NULL",
    localCurrency: "",
    SN: "",
    PN: "",
    move: {},
    move_id: "NULL",
    quantity: undefined,
    conversion: "",
    dateOfPurchase: "",
    provider: "",
    others: "",
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL",
    status: false,
    moveType: "NULL",
  }

  constructor(private store: StorageService) {
    let user = new ServiceUtil().getSession()

    this.oItem.user = user;

  }


  findAll() { return this.store.findAll(ServiceMovimentoItems.STORAGE_NAME).pipe(map(this.convertToArticle)) }

  save(): void {

    if (!this.oItem.updated_mode) { this.oItem.created_at = moment().format('DD MM,YYYY HH:mm:ss') }
    if ((this.oItem.id == "NULL")) { this.oItem.id = this.store.getId().toUpperCase(); }

    this.oItem.updated_mode = false;

    this.store.createdForceGenerateId(this.oItem, ServiceMovimentoItems.STORAGE_NAME)
      .then(() => { this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS); this.oItem.id = this.store.getId(); },
    err => { this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR) })

  }


  convertToArticle(resp: any) { return resp.map((e: any) => { return e.payload.doc.data(); }) }

  findInputMovNull(type: any = 'INPUT'): any[] {

    let listAll = [];

    listAll = this.store.findByDifferenceNameTo(
      ServiceMovimentoItems.STORAGE_NAME, 'moveType', type,
      'move', "NULL")


    return listAll
  }

  public delete() {
    this.store.deleted(ServiceMovimentoItems.STORAGE_NAME, this.oItem.id).then(() => {
      this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE)
    });
  }

}
