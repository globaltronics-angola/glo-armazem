import {StorageService} from "../shared/storage.service";
import {map} from "rxjs/operators";
import {firstValueFrom} from "rxjs";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import {Injectable} from '@angular/core';
import {ServiceEmitter} from "./ServiceEmitter";
import ServiceArticles from "./ServiceArticles";


@Injectable({
  providedIn: 'root'
})
export default class ServiceTransferencia {

  static STORAGE_NAME: string = "global-move"
  static STORAGE_MOVE_ITEM: string = "global-move-items"
  static STORAGE_EXIST_ITEM: string = "global-existence"


  private window = (<any>window)

  oItem: any = {
    id: "NULL",
    title: "",
    details: "",
    dateOfMove: "",
    financialCostTotal: 0,
    itemsQuantity: 0,
    itemsConversion: 0,
    localCurrency: "",
    client: "",
    client_nif: "",
    items: [],
    docRef: "",
    dataRef: moment().format("DDMMYYYY"),
    created_at: "NULL",
    updated_at: moment().format('DD MM,YYYY HH:mm:ss'),
    updated_mode: false,
    deleted_at: "NULL",
    email_auth: "NULL",
    user: "NULL",
    status: true,
    moveType: "NULL",
  }


  constructor(private store: StorageService) {
    let user = new ServiceUtil().getSession()

    this.oItem.user = user;
  }


  findAll() {
    return this.store.findAll(ServiceTransferencia.STORAGE_NAME).pipe(map(this.convertToArticle))
  }


  /**
   * ********************************
   *  Munzambi Miguel
   * ********************************
   *  foi implementado o metodo updateItem para actualizar informação de cada item do movimento, de modo poder
   *  associar cada item a este movimento.
   *
   *  @method updateItems
   */
  save() {

    console.log(this.oItem)
    if (!this.oItem.updated_mode) {
      this.oItem.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    }
    if ((this.oItem.id == "NULL")) {
      this.oItem.id = this.store.getId().toUpperCase();
    }

    this.oItem.updated_mode = false;

    this.updateItems()

    return this.store.createdForceGenerateId(this.oItem, ServiceTransferencia.STORAGE_NAME)
      .then(() => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
          ServiceEmitter.get('actionSendMovimento').emit("");

          this.oItem.id = this.store.getId()
        },
        err => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR)
        })

  }

  async getRefId(type: string = "") {
    let db = this.store.getFirestore();
    let list: any[] = []
    await db.collection('/' + ServiceTransferencia.STORAGE_NAME)
      .where('dataRef', "==", moment().format("DDMMYYYY"))
      .get()
      .then(snap => {
        snap.forEach(doc => {
          list.push(doc.data())
          return doc.data();
        });
      });

    return (list.length + 1);
  }

  updateItems() {

    this.oItem.items.forEach(async (item: any) => {

      let itemMove = item;
      itemMove.move = {
        id: this.oItem.id,
        title: this.oItem.title,
        details: this.oItem.details,
        dateOfMove: this.oItem.dateOfMove,
      };

      itemMove.move_id = this.oItem.id;
      itemMove.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
      this.store.createForceMyId(itemMove, ServiceTransferencia.STORAGE_MOVE_ITEM).then(() => {
      })

      this.existArticleNew(item).then();
      this.existArticle(item).then();
    })

  }


  convertToArticle(resp: any) {
    return resp.map((e: any) => {
      return e.payload.doc.data();
    })
  }

  async findMovType(type: string = 'INPUT') {

    let listAll = [];

    listAll = await this.store.findByOther(
      ServiceTransferencia.STORAGE_NAME, 'moveType', type
    )


    return listAll
  }

  async existArticle(attr: any) {
    try {
      let articleExist: any = JSON.parse(attr.existence);
      articleExist.quantity = articleExist.quantity - attr.quantity;
      this.store.createForceMyId(articleExist, ServiceTransferencia.STORAGE_EXIST_ITEM).then(() => {
      });
    } catch (e) {

    }
  }

  async existArticleNew(attr: any) {
    try {
      let articleExist: any = {};
      articleExist.id = attr.articleId + JSON.parse(attr.localStorage)
        .name.replace(" ", "_").toUpperCase() + JSON.parse(attr.localAmbry)
        .ambry.replace(" ", "_").toUpperCase() + JSON.parse(attr.localShelf)
        .replace(" ", "_").toUpperCase()

      articleExist.localStorageId = JSON.parse(attr.localStorage).id;
      articleExist.localAmbry = JSON.parse(attr.localAmbry).ambry;
      articleExist.localShelf = JSON.parse(attr.localShelf);
      articleExist.quantity = attr.quantity;
      articleExist.article = attr.article;

      let artExir: any = await firstValueFrom(this.store
        .findById(ServiceTransferencia.STORAGE_EXIST_ITEM, articleExist.id)).then((e) => {
        return e
      });
      if (artExir?.quantity)
        articleExist.quantity = articleExist.quantity + artExir.quantity;
      this.store.createForceMyId(articleExist, ServiceTransferencia.STORAGE_EXIST_ITEM).then(() => {
      });
    } catch (e) {

    }
  }

}
