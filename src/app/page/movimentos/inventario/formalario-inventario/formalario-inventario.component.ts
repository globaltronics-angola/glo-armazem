import {Component, OnInit} from '@angular/core';
import ServiceUtil from "../../../../Services/ServiceUtil";
import {StorageService} from "../../../../shared/storage.service";
import {AuthService} from "../../../../shared/auth.service";
import ServicePrintMove from "../../../../Services/ServicePrintMove";
import ServiceInventario from "../../../../Services/ServiceInventario";
import {Timestamp} from "@angular/fire/firestore";
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import {ServiceEmitter} from "../../../../Services/ServiceEmitter";
import moment from "moment";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-formalario-inventario',
  templateUrl: './formalario-inventario.component.html',
  styles: []
})
export class FormalarioInventarioComponent implements OnInit {
  util: any = ServiceUtil;
  private existanceStorage: any[] = [];
  public move: ServiceInventario;
  docRefArmazem: any;
  private window = (<any>window);
  public itemMove: ServiceMovimentoItems;
  private TYPE_MOVEMENT: string = "INVENTORY";
  private listItems: any[] = [];
  public dateRef: string = "700";
  private idMovement: string = "123";
  private know!: Subscription;

  constructor(private store: StorageService, private auth: AuthService, private printer: ServicePrintMove) {

    this.move = new ServiceInventario(this.store);
    this.itemMove = new ServiceMovimentoItems(this.store);
    this.init().then();
    this.newRef().then();
    this.onSetInfoDataSource()
  }

  async newRef() {
    this.dateRef = "700-" + moment().format("DDMMYYYY") + '-' + this.util.numberConvert(await this.move.getRefId(this.TYPE_MOVEMENT));
    this.move.oItem.docRef = this.dateRef;
    this.idMovement = this.dateRef;
  }

  async ngOnInit() {
    this.initJQuerysFunctions()

    setTimeout(async () => {
      if (this.listItems.length > 0) {
        this.docRefArmazem = this.listItems[0].storageCode
        this.existanceStorage = await this.move.getDocRef(this.docRefArmazem)

        await this.searchSaida();

      }
    }, 2000)
  }

  cancelerMovement() {

  }

  private onSetInfoDataSource() {
    this.know = ServiceEmitter.get('sendItemsMovimentoDevolution').subscribe(async (attr: any) => {

      this.window.$('#inventoryStorage').val(attr.originalRequiest).select2().change();


      this.itemMove.oItem = attr;

      this.itemMove.oItem.updated_mode = true;
    });
  }

  async save() {

    await this.init()
    this.move.oItem.items = this.listItems;
    this.move.oItem.moveType = this.TYPE_MOVEMENT;
    setTimeout(() => {
      if (this.move.oItem.items.length > 0) {
        this.move.save().then(() => {

          this.printer.printFunctionsInventory(this.move.oItem.items, this.move)
          this.newRef();

        }, err => {
          this.window.sentMessageError.init(this.util.MESSAGE_ERROR)
        });
      } else {
        this.window.sentMessageError.init("Não foi adicionado os artigos da entrada no armazém")
      }
    }, 2000)

  }

  async addListItems() {
    try {
      //await this.validationAny()

      this.itemMove.oItem.moveType = this.TYPE_MOVEMENT
      this.itemMove.oItem.move = ServiceUtil.VALUE_AT_NULLABLE
      this.itemMove.oItem.move_id = ServiceUtil.VALUE_AT_NULLABLE

      await this.itemMove.save();
      ServiceEmitter.get("actionSendMovimento").emit("");
      await this.init()
    } catch (e) {
      this.window.sentMessageError.init(e)
    }
  }

  async searchSaida() {

    this.existanceStorage = await this.move.getDocRef(this.docRefArmazem)

    await this.window.$('#inventoryStorage').select2({
      data: this.existanceStorage.map((e: any, index: number) => {
        let a: any = {id: '', text: ''};
        let art: any = JSON.parse(e.article);
        a.id = index;
        a.text = art.name + ', ' + art.model + ', ' + art.ean
        return a;
      })
    })

  }

  initJQuerysFunctions() {

    const articleSelect = this.window.$('#inventoryStorage')

    articleSelect.select2().on('change', (e: any) => {
      if (!e.target.value)
        return;

      let itemContains: any = this.existanceStorage[e.target.value];

      console.log(itemContains)
      if (itemContains.quantity == itemContains.devolvido) {
        this.window.sentMessageWarning.init("Não é possível realizar novamente a devolução ")
        throw "excedeu o limit de devolução neste item da lista"
      }
      this.itemMove.oItem.existence = itemContains;
      this.itemMove.oItem.localStorage = itemContains.localStorage

      this.itemMove.oItem.originalRequiest = e.target.value;
      this.itemMove.oItem.localStorage = itemContains.localStorage;
      this.itemMove.oItem.localStorageId = itemContains.localStorageId;
      this.itemMove.oItem.storageCode = itemContains.storageCode;
      this.itemMove.oItem.articleId = JSON.parse(itemContains.article).id;
      this.itemMove.oItem.articleName = JSON.parse(itemContains.article).name;
      this.itemMove.oItem.dateOfPurchase = Timestamp.now()
      this.itemMove.oItem.article = itemContains.article;
      this.itemMove.oItem.quantity = itemContains.quantity
    })

  }

  calculerDiferenca() {
    this.itemMove.oItem.differenceCount = this.itemMove.oItem.myCount - this.itemMove.oItem.quantity
    if (this.itemMove.oItem.differenceCount >= 0) {

    }
  }

  async init() {
    this.listItems = await new ServiceMovimentoItems(this.store).findMovNull(this.TYPE_MOVEMENT);
  }
}
