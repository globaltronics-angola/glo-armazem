import {Component, OnDestroy, OnInit} from '@angular/core';
import ServiceUtil from "../../../../Services/ServiceUtil";
import {Observable, Subscription} from "rxjs";
import {AuthService} from "../../../../shared/auth.service";
import ServiceStorage from "../../../../Services/ServiceStorage";
import {StorageService} from "../../../../shared/storage.service";
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import ServiceArticles from "../../../../Services/ServiceArticles";
import {ServiceEmitter} from "../../../../Services/ServiceEmitter";
import moment from "moment";
import ServiceTransferencia from "../../../../Services/ServiceTransferencia";
import ServicePrintMove from "../../../../Services/ServicePrintMove";
import {StorageValidateAnyService} from "../../../../shared/storage.validate.any.service";

@Component({
  selector: 'app-formulario-artigos',
  templateUrl: './formulario-artigos.component.html',
  styles: []
})
export class FormularioArtigosComponent implements OnInit, OnDestroy {

  idMovement = '123232';

  listArticle: any[] = [];

  util: any = ServiceUtil
  serviceUtil: ServiceUtil;

  private window: any = (<any>window)

  listSorage: Observable<any>
  item: ServiceMovimentoItems;
  private temporalIntegerQuant: number = 0;
  listArmarios: any[] = [];
  listShelf: any[] = [];
  private TYPE_MOVEMENT: string = "TRANSFER";
  private listItems: any[] = [];
  dateRef: string = "";
  move: ServiceTransferencia;
  private know: any = Subscription;
  private validateAny: StorageValidateAnyService;


  constructor(private auth: AuthService, private store: StorageService, private printer: ServicePrintMove) {

    this.listSorage = new ServiceStorage(this.store).findAll();
    this.item = new ServiceMovimentoItems(this.store);
    this.move = new ServiceTransferencia(this.store);
    this.serviceUtil = new ServiceUtil();

    this.validateAny = new StorageValidateAnyService(this.store, ServiceTransferencia.STORAGE_NAME)
    this.documentRef();
    this.init();
    this.onSetInfoDataSource();
  }


  async addListItems() {

    try {
      await this.validationName();
      this.item.oItem.moveType = this.TYPE_MOVEMENT
      this.item.oItem.move = ServiceUtil.VALUE_AT_NULLABLE
      this.item.oItem.move_id = ServiceUtil.VALUE_AT_NULLABLE

      await this.item.save();
      ServiceEmitter.get("actionSendMovimento").emit("");
      this.init()
    } catch (e) {
      this.window.sentMessageError.init(e)
    }
  }

  save() {

    this.move.oItem.items = this.listItems;
    this.move.oItem.moveType = this.TYPE_MOVEMENT;

    if (this.listItems.length > 0) {
      this.move.save().then(() => {

        // this.printer.printFunctionsTransfer(this.move.oItem.items, this.move)
        this.documentRef();

      });
      ServiceEmitter.get("actionSendMovimento").emit("");

      this.idMovement = this.store.getId()
    } else {
      this.window.sentMessageError.init("Não foram adicionados os artigos da transferncia no armazém")
    }
  }

  cancelerMovement() {
    this.listItems.forEach(e => {
      let ex: ServiceMovimentoItems = new ServiceMovimentoItems(this.store);
      ex.oItem = e;
      ex.delete()
      ServiceEmitter.get('actionSendMovimento').emit("")
    })

  }

  ngOnDestroy(): void {
    this.know?.unsubscribe();
  }

  ngOnInit(): void {
    this.initQuery()
  }

  initQuery() {
    const selectStorage = this.window.$('#selectStorage');
    const selectedArticle = this.window.$('#selectedArticle23');
    const selectedStorageTo = this.window.$('#selectedStorageTo');
    const selectedArmario = this.window.$('#selectedArmario');
    const selectedPrateleira = this.window.$('#selectedPrateleira');

    selectStorage.select2({minimumResultsForSearch: -1}).on('change', async (e: any) => {
      try {
        this.item.oItem.localStorageExistance = e.target.value;
        this.listArticle = await ServiceArticles.searchingArticle(JSON.parse(e.target.value).id, this.store)
      } catch (e) {
      }
    })

    selectedStorageTo.select2({minimumResultsForSearch: -1}).on('change', async (e: any) => {
      try {
        this.item.oItem.localStorage = e.target.value;
        if (e.target.value) this.listArmarios = JSON.parse(e.target.value).ambry;
      } catch (e) {
      }

    })

    selectedArmario.select2({minimumResultsForSearch: -1}).on('change', async (e: any) => {
      try {
        this.item.oItem.localAmbry = e.target.value
        if (e.target.value) this.listShelf = JSON.parse(e.target.value).shelf;
      } catch (e) {
      }
    })

    selectedPrateleira.select2({minimumResultsForSearch: -1}).on('change', (e: any) => {
      this.item.oItem.localShelf = e.target.value
    })

    selectedArticle.select2().on('change', (aY: any) => {
      try {
        this.item.oItem.existence = aY.target.value
        if (aY.target.value) {
          this.item.oItem.articleId = JSON.parse(JSON.parse(aY.target.value).article).id;
          this.item.oItem.article = JSON.parse(aY.target.value).article;
          this.temporalIntegerQuant = JSON.parse(aY.target.value).quantity
        }
      } catch (e) {

      }
    })

    this.window.$("#selectData").flatpickr({
      dateFormat: "d, m Y",
      onChange: (selectedDates: any, dateStr: any, instance: any) => {
        this.item.oItem.dateOfPurchase = dateStr
      },
    });
  }

  controllerQuantity() {

    // this.item.oItem.quantity
    if (this.temporalIntegerQuant < this.item.oItem.quantity) {
      this.window.$('#quantidadeItem').removeClass('is-valid')
      this.window.$('#quantidadeItem').addClass('is-invalid')
      this.window.sentMessageError.init("Excedeu o limite da quantidade real no armazém...");
    } else {
      this.window.$('#quantidadeItem').removeClass('is-invalid')
      this.window.$('#quantidadeItem').addClass('is-valid')
    }


  }

  async documentRef() {
    this.dateRef = "300-" + moment().format("DDMMYYYY") + '-' + this.util.numberConvert(await this.move.getRefId('INPUT'));
    this.move.oItem.docRef = this.dateRef;
    this.idMovement = this.dateRef;
  }

  // { minimumResultsForSearch: -1}
  private init() {
    this.listItems = new ServiceMovimentoItems(this.store).findInputMovNull(this.TYPE_MOVEMENT);
  }

  private onSetInfoDataSource() {
    this.know = ServiceEmitter.get('sendItemsMovimentoTransfer').subscribe(async (attr: any) => {

      this.item.oItem = attr;
      this.item.oItem.updated_mode = true

      await this.window.$('#selectStorage').val(attr.localStorageExistance).select2({minimumResultsForSearch: -1}).change();

      await setTimeout(() => {
        this.window.$('#selectedArticle23').val(attr.existence).select2().change();
      }, 1000);

      await this.window.$('#selectedStorageTo').val(attr.localStorage).select2({minimumResultsForSearch: -1}).change();

      await setTimeout(() => {
        this.window.$('#selectedArmario').val(attr.localAmbry).select2({minimumResultsForSearch: -1}).change();
      }, 1000);

      await setTimeout(() => {
        this.window.$('#selectedPrateleira').val(attr.localShelf).select2({minimumResultsForSearch: -1}).change();
      }, 2000);


    })
  }

  async validationName() {

    await this.validateAny.validateExiste(this.item.oItem.localStorageExistance, 'localStorageExistance',
      false, this.window.$('#selectStorage'), this.item.oItem.updated_mode, "", false, true)

    await this.validateAny.validateExiste(this.item.oItem.articleId, 'articleName',
      false, this.window.$('#selectedArticle23'), this.item.oItem.updated_mode, "", false, true)

    await this.validateAny.numberValidate(this.item.oItem.quantity, 'quantity',
      false, this.window.$('#quantidadeItem'), this.item.oItem.updated_mode,
      "A quantidade é inferior a 1, é permitido dar entrada de pelo menos um item", false, "", 1)

    await this.validateAny.validateExiste(this.item.oItem.localStorage, 'localStorage',
      false, this.window.$('#selectedStorageTo'), this.item.oItem.updated_mode, "", false, true)

  }
}
