import {Component, OnDestroy, OnInit} from '@angular/core';
import ServiceUtil from "../../../../Services/ServiceUtil";
import {Observable, Subscription} from "rxjs";
import ServiceDevolucao from "../../../../Services/ServiceDevolucao";
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import {StorageValidateAnyService} from "../../../../shared/storage.validate.any.service";
import {StorageService} from "../../../../shared/storage.service";
import {AuthService} from "../../../../shared/auth.service";
import ServicePrintMove from "../../../../Services/ServicePrintMove";
import ServiceStorage from "../../../../Services/ServiceStorage";
import moment from "moment";
import {ServiceEmitter} from "../../../../Services/ServiceEmitter";
import {Timestamp} from "@angular/fire/firestore";
import ServiceBaixa from "../../../../Services/ServiceBaixa";

@Component({
  selector: 'app-formulario-baixa',
  templateUrl: './formulario-baixa.component.html',
  styles: []
})
export class FormularioBaixaComponent implements OnInit, OnDestroy {

  window = (<any>window)
  listArticles: any[] = [];
  util: any = ServiceUtil;
  utilInst: ServiceUtil;
  listStorage: Observable<any>;
  listArmarios: any[] = [];
  listShelf: any[] = [];

  docRefAt: string = ""
  public move: ServiceBaixa;
  private moveEntrada: any;

  items: any[] = []
  private temporalIntegerQuant: number = 0;
  public movItems: ServiceMovimentoItems;
  private validateAny: StorageValidateAnyService;
  public listItems: any[] = [];
  private TYPE_MOVEMENT: string = "DOWNLOAD";
  private know!: Subscription;
  public dateRef: string = "";
  public idMovement: string = "1E29202";

  constructor(private store: StorageService, private auth: AuthService, private printer: ServicePrintMove) {
    this.move = new ServiceBaixa(this.store);
    this.listStorage = new ServiceStorage(this.store).findAll();
    this.utilInst = new ServiceUtil();
    this.movItems = new ServiceMovimentoItems(this.store)
    this.validateAny = new StorageValidateAnyService(this.store, ServiceDevolucao.STORAGE_MOVE)

    this.movItems.oItem.status = "404";
    this.init().then()
    this.newRef().then()
    this.onSetInfoDataSource();

  }

  ngOnDestroy() {
    this.know?.unsubscribe()
  }

  async newRef() {
    this.dateRef = "800-" + moment().format("DDMMYYYY") + '-' + this.util.numberConvert(await this.move.getRefId(this.TYPE_MOVEMENT));
    this.move.oItem.docRef = this.dateRef;
    this.idMovement = this.dateRef;
  }

  async ngOnInit() {

    this.initJQuerysFunctions()

    setTimeout(() => {
      //// console.log(this.listItems[0])
      if (this.listItems.length > 0) {
        this.docRefAt = this.listItems[0].moveInput.docRef
        this.moveEntrada = this.listItems[0].moveInput
        this.items = this.listItems[0].moveInput.items
        this.movItems.oItem.moveInput = this.moveEntrada;

        this.window.$('#devolucaoProduct').select2({
          minimumResultsForSearch: -1,
          data: this.items.map((e: any, index: number) => {
            let a: any = {id: '', text: ''};
            let art: any = JSON.parse(e.article);
            a.id = index;
            a.text = art.name + ' ' + art.model + ' Qt: ' + e.quantity + (e.devolvido ? ' | ' + ' Devolvido: ' + e.devolvido : '')
            return a;

          })
        })
      }
    }, 4000)

  }

  async save() {
    await this.init()
    this.move.oItem.items = this.listItems;
    this.move.oItem.moveType = this.TYPE_MOVEMENT;
    await this.devolution()
    setTimeout(() => {
      if (this.move.oItem.items.length > 0) {
        this.move.save().then(() => {

          this.printer.printFunctionsBaixa(this.move.oItem.items, this.move)
          this.newRef();

        }, err => {
          this.window.sentMessageError.init(this.util.MESSAGE_ERROR)
        });
      } else {
        this.window.sentMessageError.init("Não foi adicionado os artigos da entrada no armazém")
      }
    }, 2000)

  }

  cancelerMovement() {
  }

  async addListItems() {
    try {
      await this.validationAny()

      this.movItems.oItem.moveType = this.TYPE_MOVEMENT
      this.movItems.oItem.move = ServiceUtil.VALUE_AT_NULLABLE
      this.movItems.oItem.move_id = ServiceUtil.VALUE_AT_NULLABLE

      await this.movItems.save();
      ServiceEmitter.get("actionSendMovimento").emit("");
      await this.init()
    } catch (e) {
      this.window.sentMessageError.init(e)
    }

  }

  async searchSaida() {

    this.moveEntrada = await this.move.getDocRef(this.docRefAt)
    this.items = this.moveEntrada.items;
    this.movItems.oItem.moveInput = this.moveEntrada;
    await // console.log(this.moveEntrada)

    this.window.$('#devolucaoProduct').select2({
      minimumResultsForSearch: -1,
      data: this.items.map((e: any, index: number) => {
        let a: any = {id: '', text: ''};
        let art: any = JSON.parse(e.article);
        a.id = index;
        a.text = art.name + ' ' + art.model + ' Qt: ' + e.quantity
        return a;
      })
    })


  }

  private devolution() {

    this.moveEntrada.items.map((ar: any) => {
      let ab: any = ar;
      if (ab.devolucao) {
        ab.devolucao += ab.quantity
      } else {
        this.move.oItem.items.map((e: any) => {
          if (e.articleId == ar.articleId) {
            ab.articleName = JSON.parse(e.article).name
            ab.devolucao = e.quantity
          }
        })
      }
      ab.processo = "ativo"
      return ab;
    })

  }

  controllerQuantity() {
    if (this.temporalIntegerQuant < this.movItems.oItem.quantity) {
      this.window.$('#quantItem').removeClass('is-valid')
      this.window.$('#quantItem').addClass('is-invalid')
      this.window.sentMessageError.init("Excedeu o limite da quantidade real da requisição...");
      return false
    } else {
      this.window.$('#quantItem').removeClass('is-invalid')
      this.window.$('#quantItem').removeClass('is-valid')
      return true
    }
  }

  initJQuerysFunctions() {

    const armazem = this.window.$('#selectedArmazemDev');
    const clientInfo = this.window.$('#clientSelector');
    const articleSelect = this.window.$('#devolucaoProduct')

    const status = this.window.$('#selectedEstado')

    articleSelect.select2({minimumResultsForSearch: -1}).on('change', (e: any) => {
      if (!e.target.value)
        return;
      let itemContains: any = this.moveEntrada.items[e.target.value];


      if (itemContains.quantity == itemContains.devolvido) {
        this.window.sentMessageWarning.init("Não é possível realizar novamente a devolução ")
        throw "excedeu o limit de devolução neste item da lista"
      }


      this.movItems.oItem.originalRequiest = e.target.value;
      this.movItems.oItem.articleId = JSON.parse(itemContains.article).id;
      this.movItems.oItem.articleName = JSON.parse(itemContains.article).name;
      this.movItems.oItem.dateOfPurchase = Timestamp.now()
      this.movItems.oItem.article = itemContains.article;
      this.temporalIntegerQuant = itemContains.quantity

      this.movItems.oItem.primarySN = itemContains.SN;
      this.movItems.oItem.primaryPN = itemContains.PN;


    })

    status.select2({minimumResultsForSearch: -1}).on('change', (e: any) => {
      this.movItems.oItem.status = e.target.value;
    })

    armazem.select2({minimumResultsForSearch: -1}).on('change', (e: any) => {
      try {
        this.movItems.oItem.localStorage = e.target.value;
        this.listArmarios = JSON.parse(e.target.value).ambry;
      } catch (e) {
        this.movItems.oItem.localStorage = ""
      }
    })

    this.window.$('#selectedArmario').select2({minimumResultsForSearch: -1}).on('change', async (e: any) => {
      this.movItems.oItem.localAmbry = e.target.value
      if (e.target.value) this.listShelf = JSON.parse(e.target.value).shelf;
    })

    this.window.$('#selectedPrateleira').select2({minimumResultsForSearch: -1}).on('change', (e: any) => {
      this.movItems.oItem.localShelf = e.target.value
    })

    clientInfo.select2().on('change', (e: any) => {
      this.move.oItem.client = e.target.value
    })

  }

  async validationAny() {

    await this.validateAny.validateExiste(this.movItems.oItem.article, 'articleName',
      false, this.window.$('#devolucaoProduct'), this.movItems.oItem.updated_mode, "", false, true)

    if (!await this.controllerQuantity()) {
      throw "Excedeu a quantidade adimicivel de item existente na requisição"
    }

    await this.validateAny.numberValidate(this.movItems.oItem.quantity, 'quantity',
      false, this.window.$('#quantItem'), this.movItems.oItem.updated_mode,
      "A quantidade é inferior a 1, é permitido dar entrada de pelo menos um item", false, "", 1)


  }

  private onSetInfoDataSource() {
    this.know = ServiceEmitter.get('sendItemsMovimentoDevolution').subscribe(async (attr: any) => {

      this.window.$('#devolucaoProduct').val(attr.originalRequiest).select2().change();

      setTimeout(() => {
        this.window.$('#selectedArmazemDev').val(attr.localStorage).select2({minimumResultsForSearch: -1}).change()
      }, 10);

      setTimeout(() => {
        this.window.$('#selectedArmario').val(attr.localAmbry).select2({minimumResultsForSearch: -1}).change()
      }, 1000);

      setTimeout(() => {
        this.window.$('#selectedPrateleira').val(attr.localShelf).select2({minimumResultsForSearch: -1}).change()
      }, 1500);

      setTimeout(() => {
        this.window.$('#selectedEstado').val(attr.status).select2({minimumResultsForSearch: -1}).change()
      }, 2000);


      this.movItems.oItem = attr;

      this.movItems.oItem.updated_mode = true;
      this.movItems.oItem.moveInput = this.moveEntrada;
    });
  }

  async init() {
    this.listItems = await new ServiceMovimentoItems(this.store).findMovNull(this.TYPE_MOVEMENT);
  }

}
