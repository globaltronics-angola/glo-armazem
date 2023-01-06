import { StorageService } from "../shared/storage.service";
import { map } from "rxjs/operators";
import { firstValueFrom } from "rxjs";
import moment from "moment";
import ServiceUtil from "./ServiceUtil";
import { Injectable } from '@angular/core';
import ServiceMovimentoItems from "./ServiceMovimentoItems";
import { ServiceEmitter } from "./ServiceEmitter";
import ServiceArticles from "./ServiceArticles";


@Injectable({
  providedIn: 'root'
})
export default class ServiceMovimento {

  static STORAGE_NAME: string = "global-move"
  static STORAGE_MOVE_ITEM: string = "global-move-items"



  private window = (<any>window)

  oItem: any = {
    id: "NULL",
    title: "",
    details: "",
    dateOfMove: "",
    storage: "",
    financialCostTotal: "NULL",
    itemsQuantity: 0,
    itemsConversion: 0,
    client: "",
    client_nif: "",
    items: [],
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


  findAll() { return this.store.findAll(ServiceMovimento.STORAGE_NAME).pipe(map(this.convertToArticle)) }


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

    if (!this.oItem.updated_mode) { this.oItem.created_at = moment().format('DD MM,YYYY HH:mm:ss') }
    if ((this.oItem.id == "NULL")) { this.oItem.id = this.store.getId().toUpperCase(); }

    this.oItem.updated_mode = false;

    this.updateItems()

    this.store.createdForceGenerateId(this.oItem, ServiceMovimento.STORAGE_NAME)
      .then(() => {
        this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
        ServiceEmitter.get('actionSendMovimento').emit("");

        this.oItem.id = this.store.getId()
      },
        err => { this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR) })

  }


  updateItems() {

    this.oItem.items.forEach(async (item: any) => {

      this.oItem.itemsQuantity += item.quantity

      let itemMove = item;

      itemMove.move = {
        id: this.oItem.id,
        title: this.oItem.title,
        details: this.oItem.details,
        dateOfMove: this.oItem.dateOfMove,
      };

      itemMove.move_id = this.oItem.id;
      itemMove.updated_at = moment().format('DD MM,YYYY HH:mm:ss')

      let article = new ServiceArticles(this.store);
      await firstValueFrom(this.store.findById(ServiceArticles.STORAGE_ARTICLES, itemMove.articleId)).then((e) => {
        article.Article = e;
        article.Article.updated_mode = true;
       article.Article.quantity += item.quantity;

       article.save()
      })

     this.store.createForceMyId(itemMove, ServiceMovimento.STORAGE_MOVE_ITEM).then(() => { })

    })

  }


  convertToArticle(resp: any) { return resp.map((e: any) => { return e.payload.doc.data(); }) }

  async findMovType(type: string = 'INPUT') {

    let listAll = [];

    listAll = await this.store.findByOther(
      ServiceMovimento.STORAGE_NAME, 'moveType', type
    )


    return listAll
  }

}
