import {StorageService} from "../shared/storage.service";
import {map} from "rxjs/operators";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import {Injectable} from '@angular/core';
import {serverTimestamp} from "firebase/firestore";
import ServiceRequisicao from "./ServiceRequisicao";


@Injectable({
  providedIn: 'root'
})
export default class ServiceMovimentoItems {

  static STORAGE_NAME: string = "global-move-items"


  private window: any = (<any>window)

  oItem: any = {
    id: "NULL",
    article: undefined,
    articleId: undefined,
    localStorage: "",
    localAmbry: "",
    localShelf: "",
    financialCost: 0,
    localCurrency: "KZ",
    SN: "",
    PN: "",
    move: {},
    move_id: "NULL",
    quantity: 0,
    conversion: "",
    articleName: "",
    userEmail: "",
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
    updatedAt: serverTimestamp()
  }

  constructor(private store: StorageService) {
    let user = new ServiceUtil().getSession()

    this.oItem.user = user;
    this.oItem.userEmail = user.email;

  }


  findAll() {
    return this.store.findAll(ServiceMovimentoItems.STORAGE_NAME).pipe(map(this.convertToArticle))
  }

  async save() {

    if (!this.oItem.updated_mode) {
      this.oItem.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    }

    if ((this.oItem.id == "NULL")) {
      this.oItem.id = this.store.getId().toUpperCase();
    }

    this.oItem.timestamp = "" + new Date().getTime() + this.oItem.id
    this.oItem.updated_mode = false;

    let al = new ServiceRequisicao(this.store);
    al.oItem = this.oItem.moveInput

    if (await (this.oItem.moveType == "DEVOLUTION") || await (this.oItem.moveType == "DOWNLOAD")) {
      await this.addValueTirado()
      await al.save().then()
    }

    try {
      this.store.createdForceGenerateId(this.oItem, ServiceMovimentoItems.STORAGE_NAME)
        .then(() => {
            this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS);
            this.oItem.id = this.store.getId();
          },
          err => {
            this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR)
          })
    } catch (e) {
      this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR + 'Tenta novamente')
    }

  }


  convertToArticle(resp: any) {
    return resp.map((e: any) => {
      return e.payload.doc.data();
    })
  }

  findInputMovNull(type: any = 'INPUT'): any[] {

    let listAll = [];
    listAll = this.store.findByDifferenceNameTo(
      ServiceMovimentoItems.STORAGE_NAME, 'moveType', type,
      'move', "NULL")

    return listAll
  }

  async findMovNull(type: any = 'INPUT') {

    let listAll = [];
    listAll = this.store.findByDifferenceNameTo(
      ServiceMovimentoItems.STORAGE_NAME, 'moveType', type,
      'move', "NULL")

    return listAll
  }

  delete() {
    this.store.deleted(ServiceMovimentoItems.STORAGE_NAME, this.oItem.id).then(() => {
      this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS_DELETE)
    });
  }

  private addValueTirado() {
    let obj = this.oItem.moveInput;
    //let ang = obj.items.indexOf(this.oItem)

    obj.items.map((e: any) => {
      if (e.articleId == this.oItem.articleId) {
        let ay: any = e;
        if (ay.devolvido) {
          ay.devolvido += this.oItem.quantity;
        } else {
          ay.devolvido = this.oItem.quantity;
        }

        ay.processo = "pendente"
      }
    })
    // // console.log(this.oItem)
  }


}
