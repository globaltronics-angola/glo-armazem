import {StorageService} from "../shared/storage.service";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import {Injectable} from '@angular/core';
import {ServiceEmitter} from "./ServiceEmitter";
import firebase from "firebase/compat";
import FieldValue = firebase.firestore.FieldValue;
import {Timestamp} from "@angular/fire/firestore";
import {Movimento} from "./ServiceDevolucao";


@Injectable({
  providedIn: 'root'
})
export default class ServiceInventario {

  static STORAGE_MOVE: string = "global-inventory"
  static STORAGE_MOVE_ITEM: string = "global-move-items"
  static STORAGE_STORAGE: string = "global-existence-storage"

  private userInfo: any
  private window = (<any>window)


  oItem: Movimento = {
    id: "NULL", title: "", details: "", dateOfMove: Timestamp.now(),
    financialCostTotal: 0, itemsQuantity: 0, itemsConversion: 0, localCurrency: "",
    timestamp: "", client: "", client_nif: "", items: [], docRef: "", dataRef: moment().format("DDMMYYYY"),
    created_at: "NULL", updated_at: moment().format('DD MM,YYYY HH:mm:ss'), updated_mode: false,
    deleted_at: "NULL", email_auth: "NULL", user: "NULL", status: true, moveType: "NULL", updatedAt: Timestamp.now(),
    userDelete: "null"
  }


  constructor(private store: StorageService) {
    this.oItem.user = new ServiceUtil().getSession();
    this.userInfo = this.oItem.user;
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

    return this.store.createdForceGenerateId(this.oItem, ServiceInventario.STORAGE_MOVE)
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
    await db.collection('/' + ServiceInventario.STORAGE_MOVE)
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

      this.store.createForceMyId(itemMove, ServiceInventario.STORAGE_MOVE_ITEM).then()


    })

  }


  async findAllMov() {
    let listAll = [];

    listAll = await this.store.findOther(
      ServiceInventario.STORAGE_MOVE
    )
    return listAll
  }

  async findMovType(type: string = 'INVENTORY') {

    let listAll = [];

    listAll = await this.store.findByOther(
      ServiceInventario.STORAGE_MOVE, 'moveType', type
    )


    return listAll
  }


  async getDocRef(context: string = "") {

    let db = this.store.getFirestore();

    let list: any[] = []

    await db.collection('/' + ServiceInventario.STORAGE_STORAGE)
      .where('storageCode', "==", context).get()
      .then(snap => {
        snap.forEach(doc => {
          list.push(doc.data())
          return doc.data();
        });
      });

    return list;
  }
}

