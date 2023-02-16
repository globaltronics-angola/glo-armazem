import {StorageService} from "../shared/storage.service";
import {map} from "rxjs/operators";
import {firstValueFrom} from "rxjs";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import {Injectable} from '@angular/core';
import {ServiceEmitter} from "./ServiceEmitter";
import ServiceArticles from "./ServiceArticles";
import {serverTimestamp} from "firebase/firestore";
import firebase from "firebase/compat";


@Injectable({
  providedIn: 'root'
})
export default class ServiceRequisicao {

  static STORAGE_NAME: string = "global-requisicoes-artigos"
  static STORAGE_MOVE_ITEM: string = "global-move-items"
  static STORAGE_MOVE: string = "global-movimentos"
  static STORAGE_EXIST_ITEM: string = "global-existence"
  static STORAGE_EXIST_STORAGE: string = "global-existence-storage"


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
    updatedAt: serverTimestamp()
  }


  constructor(private store: StorageService,) {
    let user = new ServiceUtil().getSession()

    this.oItem.user = user;
  }


  findAll() {
    return this.store.findAll(ServiceRequisicao.STORAGE_NAME).pipe(map(this.convertToArticle))
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
  async save() {

    this.oItem.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    if ((this.oItem.id == "NULL")) {
      this.oItem.id = this.store.getId().toUpperCase();
    }
    this.oItem.timestamp = "" + new Date().getTime() + this.oItem.id
    this.oItem.updated_mode = false;

    await this.updateItems()

    throw "informação importante";

    this.store.createdForceGenerateId(this.oItem, ServiceRequisicao.STORAGE_NAME)
      .then(() => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
          ServiceEmitter.get('actionSendMovimento').emit("");

          this.oItem.id = this.store.getId()
        },
        err => {
          this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR)
        })

    return this.store.createdForceGenerateId(this.oItem, ServiceRequisicao.STORAGE_MOVE)
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
    await db.collection('/' + ServiceRequisicao.STORAGE_NAME)
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

  async updateItems() {

    for (const item of this.oItem.items) {
      const index: number = this.oItem.items.indexOf(item);
      this.oItem.itemsQuantity -= item.quantity
      let itemMove = item;
      itemMove.move = {
        id: this.oItem.id,
        title: this.oItem.title,
        details: this.oItem.details,
        dateOfMove: this.oItem.dateOfMove,
      };

      itemMove.move_id = this.oItem.id;
      itemMove.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
      this.store.createForceMyId(itemMove, ServiceRequisicao.STORAGE_MOVE_ITEM).then()
    }


    await this.existArticle(this.oItem.items).then();
    await this.existArticleStorage(this.oItem.items).then()


  }


  convertToArticle(resp: any) {
    return resp.map((e: any) => {
      return e.payload.doc.data();
    })
  }

  async findMovType(type: string = 'INPUT') {

    let listAll = [];

    listAll = await this.store.findByOther(
      ServiceRequisicao.STORAGE_NAME, 'moveType', type
    )


    return listAll
  }

  async existArticle(attrArray: any[]) {

    for (const attr of attrArray) {
      let articleExist: any = JSON.parse(attr.existence);

      let artExir: any = await firstValueFrom(this.store.findById(ServiceRequisicao.STORAGE_EXIST_ITEM, articleExist.id));

      try {
        if (artExir) {
          artExir.quantity -= attr.quantity;
          await this.store.createForceMyId(artExir, ServiceRequisicao.STORAGE_EXIST_ITEM).then(
            () => {
            }, error => {
            });
        }
      } catch (error) {
      }

    }
  }

  async existArticleStorage(attrArray: any[]) {
    for (const attr of attrArray) {
      let articleExist: any = JSON.parse(attr.existence);

      let artExir: any = await firstValueFrom(this.store.findById(ServiceRequisicao.STORAGE_EXIST_STORAGE, articleExist.id));

      try {
        if (artExir) {
          artExir.quantity -= attr.quantity;
          await this.store.createForceMyId(artExir, ServiceRequisicao.STORAGE_EXIST_STORAGE).then(
            () => {
            }, error => {
            }
          );
        }
      } catch (error) {
        // Lida com a exceção de acordo com sua necessidade
      }
    }
  }

}
