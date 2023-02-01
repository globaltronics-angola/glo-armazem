import {StorageService} from "../shared/storage.service";
import {map} from "rxjs/operators";
import {firstValueFrom} from "rxjs";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import {Injectable} from '@angular/core';
import {ServiceEmitter} from "./ServiceEmitter";
import firebase from "firebase/compat";
import FieldValue = firebase.firestore.FieldValue;
import {
  collection, getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryConstraint,
  Timestamp,
  where
} from "@angular/fire/firestore";
import ServiceRequisicao from "./ServiceRequisicao";
import ServiceMovimento from "./ServiceMovimento";


@Injectable({
  providedIn: 'root'
})
export default class ServiceBaixa {

  static STORAGE_NAME: string = "global-baixa-artigos"
  static STORAGE_MOVE: string = "global-movimentos"
  static STORAGE_MOVE_ITEM: string = "global-move-items"
  static STORAGE_EXIST_ITEM_ST: string = "global-existence"
  static STORAGE_EXIST_ITEM_ST_DC: string = "global-existence-storage"

  private userInfo: any
  private window = (<any>window)

  oItem: Movimento = {
    id: "NULL", title: "", details: "", dateOfMove: Timestamp.now(),
    financialCostTotal: 0, itemsQuantity: 0, itemsConversion: 0, localCurrency: "",
    timestamp: "", client: "", client_nif: "", items: [], docRef: "", dataRef: moment().format("DDMMYYYY"),
    created_at: "NULL", updated_at: moment().format('DD MM,YYYY HH:mm:ss'), updated_mode: false,
    deleted_at: "NULL", email_auth: "NULL", user: "NULL", status: true, moveType: "NULL", updatedAt: Timestamp.now(),
    userDelete: "null",
  }


  constructor(private store: StorageService) {
    this.oItem.user = new ServiceUtil().getSession();
    this.userInfo = this.oItem.user;
  }


  findAll() {
    return this.store.findAll(ServiceBaixa.STORAGE_NAME).pipe(map(this.convertToArticle))
  }

  save() {

    if (!this.oItem.updated_mode) {
      this.oItem.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    }
    if ((this.oItem.id == "NULL")) {
      this.oItem.id = this.store.getId().toUpperCase();
    }
    this.oItem.timestamp = "" + new Date().getTime() + this.oItem.id
    this.oItem.updated_mode = false;


    this.updateItems()

    this.store.createdForceGenerateId(this.oItem, ServiceBaixa.STORAGE_MOVE)
      .then(() => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
          ServiceEmitter.get('actionSendMovimento').emit("");

          this.oItem.id = this.store.getId()
        },
        err => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR)
        })

    return this.store.createdForceGenerateId(this.oItem, ServiceBaixa.STORAGE_NAME)
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
    await db.collection('/' + ServiceBaixa.STORAGE_NAME)
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

  async getDocRef(context: string = "") {

    let db = this.store.getFirestore();

    // console.log("vaja isso " + context)
    let list: any[] = []

    await db.collection('/' + ServiceMovimento.STORAGE_NAME)
      .where('docRef', "==", context).get()
      .then(snap => {
        snap.forEach(doc => {
          list.push(doc.data())
          return doc.data();
        });
      });

    return list[0];
  }

  updateItems() {

    this.oItem.items.forEach(async (item: any) => {


      this.oItem.itemsQuantity += item.quantity
      this.oItem.localCurrency = item.localCurrency
      this.oItem.financialCostTotal += item.financialCost

      let itemMove: any = item;

      itemMove.move = {
        id: this.oItem.id,
        title: this.oItem.title,
        details: this.oItem.details,
        dateOfMove: this.oItem.dateOfMove
      };

      itemMove.move_id = this.oItem.id;
      itemMove.updated_at = moment().format('DD MM,YYYY HH:mm:ss')

      this.store.createForceMyId(itemMove, ServiceBaixa.STORAGE_MOVE_ITEM).then()

        await this.existArticleNewStoreDC(item)
        await this.existArticleNewStore(item)



    })

  }


  convertToArticle(resp: any) {
    return resp.map((e: any) => {
      return e.payload.doc.data();
    })
  }

  async findAllMov() {
    let listAll = [];

    listAll = await this.store.findOther(
      ServiceBaixa.STORAGE_MOVE
    )
    return listAll
  }

  async findMovType(type: string = 'INPUT') {

    let listAll = [];

    listAll = await this.store.findByOther(
      ServiceBaixa.STORAGE_MOVE, 'moveType', type
    )

    return listAll
  }


  async existArticleNewStore(attr: any) {

    let articleExist: any = {};
    articleExist.id = attr.articleId + JSON.parse(attr.localStorage).id
      + (attr.localAmbry ? JSON.parse(attr.localAmbry).ambry.id + '-' : '')
      + (attr.localShelf ? JSON.parse(attr.localShelf).id + '-' : '')

    articleExist.localStorageId = JSON.parse(attr.localStorage).id;
    articleExist.localStorage = JSON.parse(attr.localStorage).name;
    articleExist.storageCode = JSON.parse(attr.localStorage).codigo;
    articleExist.localAmbry = (attr.localAmbry ? JSON.parse(attr.localAmbry).ambry.name : '');
    articleExist.localShelf = (attr.localShelf ? JSON.parse(attr.localShelf).name : '');
    articleExist.quantity = attr.quantity;
    articleExist.article = attr.article;
    articleExist.color = "text-danger";
    articleExist.created_at = Timestamp.now();
    articleExist.updated_at = Timestamp.now();
    articleExist.deletad_at = "NULL";
    articleExist.order = this.store.getId() + '-' + attr.quantity;
    articleExist.articleName = attr.article ? JSON.parse(attr.article).name : '';

    let artExir: any = await firstValueFrom(this.store
      .findById(ServiceBaixa.STORAGE_EXIST_ITEM_ST, articleExist.id)).then((e) => {
      return e
    });

    if (artExir?.quantity) {
      articleExist.quantity = articleExist.quantity - artExir.quantity;
      articleExist.order = this.store.getId() + '-' + articleExist.quantity;
    }

    this.store.createForceMyId(articleExist, ServiceBaixa.STORAGE_EXIST_ITEM_ST).then(() => {
    });

  }

  async existArticleNewStoreDC(attr: any) {

    let articleExist: any = {};
    articleExist.id = attr.articleId + JSON.parse(attr.localStorage).id


    let artExir: any = await firstValueFrom(this.store
      .findById(ServiceBaixa.STORAGE_EXIST_ITEM_ST_DC, articleExist.id)).then((eX) => {
      // console.log(eX);
      return eX
    });

    if (artExir.quantity) {
      artExir.quantity = artExir.quantity - attr.quantity;
      artExir.order = this.store.getId() + '-' + artExir.quantity;
      this.store.createForceMyId(artExir, ServiceBaixa.STORAGE_EXIST_ITEM_ST_DC).then();
    }


  }
}

export interface Movimento {
  id: string,
  title: string,
  details: string,
  dateOfMove: FieldValue,
  financialCostTotal: number,
  itemsQuantity: number,
  itemsConversion: number,
  localCurrency: string,
  client: string,
  client_nif: string,
  items: any[],
  timestamp: string,
  docRef: string,
  dataRef: string,
  created_at: string,
  updated_at: string,
  updated_mode: boolean,
  deleted_at: string,
  email_auth: string,
  user: string,
  status: boolean,
  moveType: string,
  updatedAt: FieldValue,
  userDelete: any
}
