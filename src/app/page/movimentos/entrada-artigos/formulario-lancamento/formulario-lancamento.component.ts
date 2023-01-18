import {Component, Input, OnInit} from '@angular/core';
import ServiceCountry from "../../../../Services/ServiceCountry";
import {StorageService} from "../../../../shared/storage.service";
import * as Tagify from "@yaireo/tagify";
import moment from "moment";
import ServiceUtil from "../../../../Services/ServiceUtil";
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import ServiceArmario from "../../../../Services/ServiceArmario";
import ServicePrateleias from "../../../../Services/ServicePrateleias";
import {ServiceEmitter} from "../../../../Services/ServiceEmitter";
import {Observable, firstValueFrom, Subscription} from 'rxjs';
import ServiceStorage from '../../../../Services/ServiceStorage';
import ServiceMovimento from 'src/app/Services/ServiceMovimento';
import ServiceFornecedor from 'src/app/Services/ServiceFornecedor';
import ServiceArticles from "../../../../Services/ServiceArticles";
import {AuthService} from "../../../../shared/auth.service";
//@ts-ignore
import * as pdfMake from "pdfmake";
import ServicePrintMove from "../../../../Services/ServicePrintMove";


@Component({
  selector: 'app-formulario-lancamento',
  templateUrl: './formulario-lancamento.component.html',
  styles: []
})
export class FormularioLancamentoComponent implements OnInit {

  private window = (<any>window)
  listArticle: Observable<any>;
  listProvide: Observable<any>;
  listStorage: Observable<any>;
  listCountries: any[];
  listArmarios: any[] = [];
  listShelf: any[] = [];

  // .typeMovimento == "INPUT"
  TYPE_MOVEMENT: string = "INPUT"
  item: ServiceMovimentoItems;

  idMovement = "1234534"
  move: ServiceMovimento;

  know: Subscription | undefined
  listItems: any[] = [];
  utilService: ServiceUtil;
  util: any = ServiceUtil;

  dateRef: string = ""


  printerPdf() {
    this.window.print();
  }

  async onUpdated() {
  }


  constructor(private store: StorageService, private auth: AuthService, private printer: ServicePrintMove) {

    this.listItems = new ServiceMovimentoItems(this.store).findInputMovNull()

    this.listArticle = new ServiceArticles(this.store).findAll();
    this.listProvide = new ServiceFornecedor(this.store).findAll();
    this.listStorage = new ServiceStorage(this.store).findAll();
    this.listCountries = new ServiceCountry(this.store).listCountry();

    this.item = new ServiceMovimentoItems(this.store);
    this.move = new ServiceMovimento(this.store);

    this.utilService = new ServiceUtil();

    this.newRef();
    this.init();

    this.onSetInfoDataSource();

  }

  async newRef() {
    this.dateRef = "ENT-" + moment().format("DDMMYYYY") + '-' + this.util.numberConvert(await this.move.getRefId('INPUT'));
    this.move.oItem.docRef = this.dateRef;
    this.idMovement = this.dateRef;
  }

  async init() {
    this.listItems = new ServiceMovimentoItems(this.store).findInputMovNull();
  }

  onTesting() {
    //console.log(this.itensCompra)
  }

  save() {

    this.move.oItem.id = this.dateRef;
    this.move.oItem.items = this.listItems;
    this.move.oItem.moveType = this.TYPE_MOVEMENT;

    if (this.move.oItem.items.length > 0) {
      this.move.save().then(() => {

        this.printer.printFunctions(this.move.oItem.items, this.move)
        this.move.oItem = {};
        this.newRef();

      }, err => {
        this.window.sentMessageError(this.util.MESSAGE_ERROR)
      });
    }else{
      this.window.sentMessageError("Não foi adicionado os artigos da entrada no armazém")
    }
  }


  addListItemsTo() {

    this.item.oItem.moveType = this.TYPE_MOVEMENT
    this.item.oItem.move = ServiceUtil.VALUE_AT_NULLABLE
    this.item.oItem.move_id = ServiceUtil.VALUE_AT_NULLABLE

    this.item.save();
    ServiceEmitter.get("actionSendMovimento").emit("");
    this.init()
  }

  async ngOnInit() {
    this.initJQuerysFunctions()
    this.init();
  }


  async cancelerMovement(): Promise<any> {
    this.listItems.forEach(e => {
      let ex: ServiceMovimentoItems = new ServiceMovimentoItems(this.store);
      ex.oItem = e;
      ex.delete()
    })
  }

  calcularQuantidades() {

    const listPendnts = [];

  }

  ngOnDestroy() {
    this.know?.unsubscribe();
  }

  onSetInfoDataSource(): void {


    this.know = ServiceEmitter.get('sendItemsMovimento').subscribe(async (attr: any) => {

      //this.window.$('#kt_accordion_2_item_1').addClass('show');

      this.listArmarios = await JSON.parse(attr.localStorage).ambry
      this.listShelf = await JSON.parse(attr.localAmbry).shelf


      this.window.$('#selectedArmazem').val(attr.localStorage).select2().change();
      setTimeout(() => {
        this.window.$('#selectedArmario').val(attr.localAmbry).select2().change();
      }, 1000);

      setTimeout(() => {
        this.window.$('#selectedPrateleira').val(attr.localShelf).select2().change();
      }, 2000);

      this.item.oItem = attr;
      this.item.oItem.updated_mode = true

    })

  }

  initJQuerysFunctions() {

    this.window.$('#selectedArmazem').select2({ minimumResultsForSearch: -1}).on('change', async (e: any) => {

      this.item.oItem.localStorage = e.target.value;
      if (e.target.value) this.listArmarios = JSON.parse(e.target.value).ambry;

    });

    this.window.$('#selectedArmario').select2({ minimumResultsForSearch: -1}).on('change', async (e: any) => {
      this.item.oItem.localAmbry = e.target.value
      if (e.target.value) this.listShelf = JSON.parse(e.target.value).shelf;
    })

    this.window.$('#selectedPrateleira').select2({ minimumResultsForSearch: -1}).on('change', (e: any) => {
      this.item.oItem.localShelf = e.target.value
    })


    this.window.$("#select_compra").flatpickr({
      dateFormat: "d, m Y",
      onChange: (selectedDates: any, dateStr: any, instance: any) => {
        this.item.oItem.dateOfPurchase = dateStr
      },
    });


    this.window.$('#selectFornecedor').select2().on('change', (e: any) => {
      if (e.target.value) {
        this.item.oItem.provider = e.target.value
      }
    })

    this.window.$('#selectedCountry').select2().on('change', (e: any) => {
      this.item.oItem.localCurrency = e.target.value
    })

    this.window.$('#selectedProduct').select2().on('change', (e: any) => {
      this.item.oItem.article = e.target.value
      if (this.item.oItem.article) {
        this.item.oItem.articleId = JSON.parse(this.item.oItem.article).id
      }
    })


    this.window.$("#select_data_movimento").flatpickr({
      dateFormat: "d, m Y",
      onChange: (selectedDates: any, dateStr: any, instance: any) => {
        this.move.oItem.dateOfMove = dateStr
      }
    });

    const othersTagify = document.querySelector("#tagify_others");

    // @ts-ignore
    new Tagify(othersTagify, {
      originalInputValueFormat: (valuesArr: any) => valuesArr.map((item: any) => item.value).join(',')
    });

    // @ts-ignore
    othersTagify.addEventListener('change', (e: any) => {
      this.item.oItem.others = e.target.value.split(',')
    })

  }

}
