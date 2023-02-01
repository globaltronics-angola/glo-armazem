import {StorageService} from "../shared/storage.service";
import {map} from "rxjs/operators";
import {firstValueFrom} from "rxjs";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import {Injectable} from '@angular/core';
import {ServiceEmitter} from "./ServiceEmitter";
import {Timestamp} from "@angular/fire/firestore";
import {Movimento} from "./ServiceMovimento";


@Injectable({
  providedIn: 'root'
})
export default class ServiceTransferencia {

  static STORAGE_NAME: string = "global-transferencias-artigos"
  static STORAGE_MOVE: string = "global-movimentos"
  static STORAGE_MOVE_ITEM: string = "global-move-items"
  static STORAGE_EXIST_ITEM: string = "global-existence"
  static STORAGE_EXIST_STORAGE: string = "global-existence-storage"


  private window = (<any>window)

  oItem: Movimento = {
    id: "NULL", title: "", details: "", dateOfMove: Timestamp.now(),
    financialCostTotal: 0, itemsQuantity: 0, itemsConversion: 0, localCurrency: "",
    timestamp: "", client: "", client_nif: "", items: [], docRef: "", dataRef: moment().format("DDMMYYYY"),
    created_at: "NULL", updated_at: moment().format('DD MM,YYYY HH:mm:ss'), updated_mode: false,
    deleted_at: "NULL", email_auth: "NULL", user: "NULL", status: true, moveType: "NULL", updatedAt: Timestamp.now(),
    userDelete: "null"
  }

  private userInfo: any;

  constructor(private store: StorageService) {
    let user = new ServiceUtil().getSession()
    this.userInfo = user;
    this.oItem.user = user;
  }


  findAll() {
    return this.store.findAll(ServiceTransferencia.STORAGE_NAME).pipe(map(this.convertToArticle))
  }

  save() {

    // console.log(this.oItem)
    if (!this.oItem.updated_mode) {
      this.oItem.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    }
    if ((this.oItem.id == "NULL")) {
      this.oItem.id = this.store.getId().toUpperCase();
    }
    this.oItem.timestamp = "" + new Date().getTime() + this.oItem.id
    this.oItem.updated_mode = false;

    this.updateItems()

    this.store.createdForceGenerateId(this.oItem, ServiceTransferencia.STORAGE_NAME)
      .then(() => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
          ServiceEmitter.get('actionSendMovimento').emit("");

          this.oItem.id = this.store.getId()
        },
        err => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR)
        })
    return this.store.createdForceGenerateId(this.oItem, ServiceTransferencia.STORAGE_MOVE)
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
      this.existArticleNewStorage(item).then()
      this.existArticle(item).then();
      this.removedGeralExistence(item).then()
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

  async removedGeralExistence(attr: any) {
    let articleExist: any = JSON.parse(attr.existence);
    articleExist.id = attr.articleId + JSON.parse(attr.localStorage).id

    let artExir: any = await firstValueFrom(this.store
      .findById(ServiceTransferencia.STORAGE_EXIST_STORAGE, articleExist.id)).then((e) => {
      return e
    });
    articleExist.quantity = artExir.quantity - attr.quantity;

    this.store.createForceMyId(articleExist, ServiceTransferencia.STORAGE_EXIST_STORAGE).then(() => {
    });
  }

  async existArticleNew(attr: any) {
    try {

      let articleExist: any = {};

      articleExist.id = attr.articleId + JSON.parse(attr.localStorage).id
        + (attr.localAmbry ? JSON.parse(attr.localAmbry).ambry.id + '-' : '')
        + (attr.localShelf ? JSON.parse(attr.localShelf).id + '-' : '')

      articleExist.localStorageId = JSON.parse(attr.localStorage).id;
      articleExist.localStorage = JSON.parse(attr.localStorage).name;
      articleExist.localAmbry = (attr.localAmbry ? JSON.parse(attr.localAmbry).ambry.name : '');
      articleExist.localShelf = (attr.localShelf ? JSON.parse(attr.localShelf).name : '');
      articleExist.quantity = attr.quantity;
      articleExist.article = attr.article;
      articleExist.articleId = JSON.parse(attr.article).id;
      articleExist.created_at = Timestamp.now();
      articleExist.updated_at = Timestamp.now();
      articleExist.deletad_at = "NULL";
      articleExist.order = this.store.getId() + '-' + attr.quantity;
      articleExist.articleName = attr.article ? JSON.parse(attr.article).name : '';

      let usersArry: any = []
      usersArry[this.userInfo.email] = {
        'name': this.userInfo.displayName,
        'photo': this.userInfo.photoURL,
        'iteration': 1
      };

      articleExist.users = usersArry;

      let artExir: any = await firstValueFrom(this.store
        .findById(ServiceTransferencia.STORAGE_EXIST_ITEM, articleExist.id)).then((e) => {
        return e
      });

      if (artExir?.quantity) {
        articleExist.quantity = articleExist.quantity + artExir.quantity;
        articleExist.users[this.userInfo.email].iteration += 1;
        articleExist.order = this.store.getId() + '-' + articleExist.quantity;
      }

      this.store.createForceMyId(articleExist, ServiceTransferencia.STORAGE_EXIST_ITEM).then(() => {
      });
    } catch (e) {
    }
  }

  async existArticleNewStorage(attr: any) {
    try {

      let articleExist: any = {};

      articleExist.id = attr.articleId + JSON.parse(attr.localStorage).id

      articleExist.localStorageId = JSON.parse(attr.localStorage).id;
      articleExist.localStorage = JSON.parse(attr.localStorage).name;
      articleExist.quantity = attr.quantity;
      articleExist.article = attr.article;
      articleExist.articleId = JSON.parse(attr.article).id;
      articleExist.created_at = Timestamp.now();
      articleExist.updated_at = Timestamp.now();
      articleExist.deletad_at = "NULL";
      articleExist.order = this.store.getId() + '-' + attr.quantity;
      articleExist.articleName = attr.article ? JSON.parse(attr.article).name : '';

      let usersArry: any = []
      usersArry[this.userInfo.email] = {
        'name': this.userInfo.displayName,
        'photo': this.userInfo.photoURL,
        'iteration': 1
      };

      articleExist.users = usersArry;

      let artExir: any = await firstValueFrom(this.store
        .findById(ServiceTransferencia.STORAGE_EXIST_STORAGE, articleExist.id)).then((e) => {
        return e
      });

      if (artExir?.quantity) {
        articleExist.quantity = articleExist.quantity + artExir.quantity;
        articleExist.users[this.userInfo.email].iteration += 1;
        articleExist.order = this.store.getId() + '-' + articleExist.quantity;
      }

      this.store.createForceMyId(articleExist, ServiceTransferencia.STORAGE_EXIST_STORAGE).then(() => {
      });
    } catch (e) {
    }
  }

}
