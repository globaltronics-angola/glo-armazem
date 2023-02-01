import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {StorageService} from "../../../../shared/storage.service";
import moment from "moment/moment";
import ServiceUtil from "../../../../Services/ServiceUtil";
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import {ServiceEmitter} from "../../../../Services/ServiceEmitter";
import ServiceClients from "../../../../Services/ServiceClients";
import {Observable, Subscription} from 'rxjs';
import ServiceMovimento from 'src/app/Services/ServiceMovimento';
import {AuthService} from 'src/app/shared/auth.service';
import {Router} from '@angular/router';
import ServiceStorage from "../../../../Services/ServiceStorage";
import ServiceRequisicao from "../../../../Services/ServiceRequisicao";
import ServicePrintMove from "../../../../Services/ServicePrintMove";
import {StorageValidateAnyService} from "../../../../shared/storage.validate.any.service";

@Component({
  selector: 'app-form-requisicao',
  templateUrl: './form-requisicao.component.html',
  styleUrls: ['./form-requisicao.component.css']
})
export class FormRequisicaoComponent implements OnInit, OnDestroy {

  @ViewChild("selectedProduct", {static: true}) productSelect2!: ElementRef;

  dateRef: any;

  TYPE_MOVEMENT: string = "OUTPUT";

  private window = (<any>window)
  listOption: any[] = [];

  listArticles: any[] = [];

  item: ServiceMovimentoItems;
  move: ServiceRequisicao;

  productSelector: any = ""
  listItems: any[] = [];

  util: any = ServiceUtil
  serviceUtil: ServiceUtil;
  listClient: Observable<any>

  listStorage: Observable<any>

  listAmbry: any[] = [];
  listShelf: any[] = [];
  listArticle: any[] = [];

  idMovement: any = "12123"
  temporalIntegerQuant: number = 0;
  private know: any = Subscription;
  private validateAny: StorageValidateAnyService;


  constructor(private store: StorageService, private printer: ServicePrintMove,
              private auth: AuthService, private router: Router) {

    if (!auth.user)
      this.router.navigate(['/auth/sign-in']).then();

    this.listClient = new ServiceClients(this.store).findAll()
    this.listStorage = new ServiceStorage(this.store).findAll()
    this.serviceUtil = new ServiceUtil();

    this.item = new ServiceMovimentoItems(this.store);
    this.move = new ServiceRequisicao(this.store);
    this.listItems = new ServiceMovimentoItems(this.store).findInputMovNull(this.TYPE_MOVEMENT);

    this.validateAny = new StorageValidateAnyService(this.store, ServiceRequisicao.STORAGE_NAME)

    this.documentRef().then();

    this.init()
    this.onSetInfoDataSource();
  }

  ngOnDestroy(): void {
    this.know.unsubscribe();
  }

  controllerQuantity() {

    // this.item.oItem.quantity
    if (this.temporalIntegerQuant < this.item.oItem.quantity) {
      this.window.$('#quantidadeItem').removeClass('is-valid')
      this.window.$('#quantidadeItem').addClass('is-invalid')
      this.window.sentMessageError.init("Excedeu o limite da quantidade real no armazém...");
      return false
    } else {
      this.window.$('#quantidadeItem').removeClass('is-invalid')
      this.window.$('#quantidadeItem').addClass('is-valid')
      return true
    }


  }

  async documentRef() {
    let sequencia: number = await this.move.getRefId()
    this.dateRef = "400-" + moment().format("DDMMYYYY") + '-' + this.util.numberConvert(sequencia);
    this.idMovement = this.dateRef;
    this.move.oItem.docRef = this.dateRef;
  }

  async save() {

    try {
      await this.validateTitle();
      await setTimeout(() => {
        this.move.oItem.items = this.listItems;
        this.move.oItem.moveType = this.TYPE_MOVEMENT;

        if (this.listItems.length > 0) {
          this.move.save().then(() => {

            this.printer.printFunctionsRequisition(this.move.oItem.items, this.move)
            this.documentRef();

          });
          ServiceEmitter.get("actionSendMovimento").emit("");

        } else {
          this.window.sentMessageSuccess.init("Não foram adicionados os artigos da requisição no armazém")
        }
      }, 1000)
    } catch (e) {
      this.window.sentMessageError.init(e)
    }
  }


  async addListItems() {

    await this.validationName();

    await this.window.$('#selectedArmazem').select2({minimumResultsForSearch: -1}).change()
    await this.window.$('#selectedArticle').select2().change()
    await setTimeout(async () => {
      try {


        await this.validationName()

        this.item.oItem.moveType = this.TYPE_MOVEMENT
        this.item.oItem.move = ServiceUtil.VALUE_AT_NULLABLE
        this.item.oItem.move_id = ServiceUtil.VALUE_AT_NULLABLE

        this.item.save();

        ServiceEmitter.get('actionSendMovimento').emit("")
        this.init()
      } catch (e) {
        this.window.sentMessageError.init(e)
      }
    }, 1000)
  }

  async ngOnInit() {
    this.window.InstanceAplication.init()
    this.initJQuerysFunctions()
  }

  initJQuerysFunctions() {

    const armazem = this.window.$('#selectedArmazem');

    const clientInfo = this.window.$('#clientSelector');


    const articleSelect = this.window.$('#selectedArticle')
    articleSelect.select2().on('change', (e: any) => {
      try {
        this.item.oItem.existence = e.target.value
        if (e.target.value) {
          this.item.oItem.articleId = JSON.parse(JSON.parse(e.target.value).article).id;
          this.item.oItem.article = JSON.parse(e.target.value).article;
          this.temporalIntegerQuant = JSON.parse(e.target.value).quantity
        }
      } catch (eY) {

      }

    })

    armazem.select2({minimumResultsForSearch: -1}).on('change', (e: any) => {
      try {
        this.item.oItem.localStorage = e.target.value;
        this.searchingArticle(JSON.parse(e.target.value).id).then()
      } catch (e) {
        this.item.oItem.localStorage = ""
      }
    })

    clientInfo.select2().on('change', (e: any) => {
      this.move.oItem.client = e.target.value
    })

  }

  async init() {
    this.listItems = new ServiceMovimentoItems(this.store).findInputMovNull(this.TYPE_MOVEMENT);
  }

  async cancelerMovement(): Promise<any> {

    this.listItems.forEach(e => {
      let ex: ServiceMovimentoItems = new ServiceMovimentoItems(this.store);
      ex.oItem = e;
      ex.delete()
      ServiceEmitter.get('actionSendMovimento').emit("")
    })
  }

  enteredNewItem() {
    this.addListItems()
  }

  async searchingArticle(attr: any) {
    await this.store.getForeStore().collection(ServiceMovimento.STORAGE_EXIST_ITEM)
      .where('localStorageId', '==', attr)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          this.listArticle.push(doc.data())
          return doc.data();
        });
      });

  }

  private onSetInfoDataSource() {

    this.know = ServiceEmitter.get('sendItemsMovimentoSaida').subscribe(async (attr: any) => {

      setTimeout(() => {
        this.window.$('#selectedArmazem').val(attr.localStorage).select2({minimumResultsForSearch: -1}).change()
      }, 10);

      setTimeout(() => {
        this.window.$('#selectedArticle').val(attr.existence).select2().change();
      }, 1000);


      this.item.oItem = attr;

      this.item.oItem.updated_mode = true;
    });
  }

  async validationName() {

    await this.validateAny.validateExiste(this.item.oItem.localStorage, 'localStorage',
      false, this.window.$('#selectedArmazem'), this.item.oItem.updated_mode, "", false, true)

    await this.validateAny.validateExiste(this.item.oItem.article, 'articleName',
      false, this.window.$('#selectedArticle'), this.item.oItem.updated_mode, "", false, true)

    await this.validateAny.numberValidate(this.item.oItem.financialCost, 'quantity',
      false, this.window.$('#inputFinancialCost'), this.item.oItem.updated_mode,
      "A quantidade é inferior a 0, é permitido ao menos 0 kz indicando ausência de custo do item comprada", false, "", 0)

    if (!await this.controllerQuantity()){
      throw "Excedeu o limite da quantidade de item admissível"
    }

    await this.validateAny.numberValidate(this.item.oItem.quantity, 'quantity',
      false, this.window.$('#quantidadeItem'), this.item.oItem.updated_mode,
      "A quantidade é inferior a 1, é permitido dar entrada de pelo menos um item", false, "", 1)

  }

  async validateTitle() {
    await this.validateAny.validateExiste(this.move.oItem.title, 'title',
      false, this.window.$('#titleMove'), this.item.oItem.updated_mode, "", false, false)
  }
}
