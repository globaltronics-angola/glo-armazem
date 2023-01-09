import { Component, Input, OnInit } from '@angular/core';
import ServiceCountry from "../../../../Services/ServiceCountry";
import { StorageService } from "../../../../shared/storage.service";
import * as Tagify from "@yaireo/tagify";
import moment from "moment";
import ServiceUtil from "../../../../Services/ServiceUtil";
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import ServiceArmazem from "../../../../Services/ServiceStorage";
import ServiceArmario from "../../../../Services/ServiceArmario";
import ServicePrateleias from "../../../../Services/ServicePrateleias";
import ServiceFornecedores from "../../../../Services/ServiceFornecedores";
import { ServiceEmitter } from "../../../../Services/ServiceEmitter";
import ServiceEanArticleOrService from 'src/app/Services/ServiceEanArticleOrService';
import { Observable, firstValueFrom, Subscription } from 'rxjs';
import ServiceStorage from '../../../../Services/ServiceStorage';
import ServiceMovimento from 'src/app/Services/ServiceMovimento';
import ServiceFornecedor from 'src/app/Services/ServiceFornecedor';


@Component({
  selector: 'app-formulario-lancamento',
  templateUrl: './formulario-lancamento.component.html',
  styles: []
})
export class FormularioLancamentoComponent implements OnInit {

  private window = (<any>window)
  listArticle: any[] = [];
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

  dateRef:string  = ""


  printerPdf(){
    this.window.print();
  }

  async onUpdated() { }


  constructor(private store: StorageService) {

    this.listArticle = new ServiceEanArticleOrService(this.store).findArticles();
    this.listProvide = new ServiceFornecedor(this.store).findAll();
    this.listStorage = new ServiceStorage(this.store).findAll();
    this.listCountries = new ServiceCountry(this.store).listCountry();

    this.item = new ServiceMovimentoItems(this.store);
    this.move = new ServiceMovimento(this.store);

    this.utilService = new ServiceUtil();

    this.dateRef = "ENT-" +  moment().format("DDMMYYYY") + "-0001";

    this.init();

    this.onSetInfoDataSource();

  }

  async init() {
    this.listArmarios = await firstValueFrom(new ServiceArmario(this.store).findAll());
    this.listShelf = await firstValueFrom(new ServicePrateleias(this.store).findAll());

    this.listItems = new ServiceMovimentoItems(this.store).findInputMovNull();
  }

  onTesting() {
    //console.log(this.itensCompra)
  }

  save() {


    this.move.oItem.items = this.listItems;
    this.move.oItem.storage = this.window.instanceSelectedArmazemId;
    this.move.oItem.moveType = this.TYPE_MOVEMENT;

    this.move.save();
    ServiceEmitter.get("actionSendMovimento").emit("");

  }


  addListItems() {


    this.item.oItem.moveType = this.TYPE_MOVEMENT
    this.item.oItem.move = ServiceUtil.VALUE_AT_NULLABLE
    this.item.oItem.move_id = ServiceUtil.VALUE_AT_NULLABLE

    this.item.save();
    ServiceEmitter.get("actionSendMovimento").emit("");
  }

  async ngOnInit() {
    this.initJQuerysFunctions()
    this.idMovement = this.store.getId();
  }


  async cancelerMovement(): Promise<any> {

    const listDelete = new ServiceMovimentoItems(this.store).findInputMovNull()

    listDelete.forEach((anyValue: any) => {
      let itemMove = new ServiceMovimentoItems(this.store);
      itemMove.oItem = anyValue;
      itemMove.delete();
    })
  }

  calcularQuantidades() {

    const listPendnts = [];

  }


  ngOnDestroy() {
    this.know?.unsubscribe();
  }


  onSetInfoDataSource(): void {


    this.know = ServiceEmitter.get('sendItemsMovimento').subscribe((attr: any) => {

      this.window.$('#kt_accordion_2_item_1').addClass('show');


      console.log(attr)


      this.window.$('#tagify_others').val(attr.others);
      this.window.$('#select_compra').val(attr.dateOfPurchase);
      this.window.$('#selectedProduct').val(attr.article.toString()).select2();
      this.window.$('#selectFornecedor').val(attr.provider).select2();

      this.window.$('#selectedArmazem').val(attr.localStorage).select2();
      this.window.$('#selectedArmario').val(attr.localAmbry).select2();
      this.window.$('#selectedPrateleira').val(attr.localShelf).select2();
      this.window.$('#selectedCountry').val(attr.localCurrency).select2();

      this.item.oItem = attr;


    })

  }

  initJQuerysFunctions() {

    this.window.instanceSelectedValueOthers = "";
    this.window.instanceSelectedIdCountry = "";
    this.window.instanceSelectedDateItensCompra = "";
    this.window.instanceSelectedDateItensCompraMovimento = "";


    // components da localizaçao
    this.window.instanceSelectedArmazemId = "";
    this.window.instanceSelectedArmarioId = "";
    this.window.instanceSelectedPrateleiraId = "";
    this.window.instanceSelectedFornecedorId = "";

    this.window.listArmarios = [];


    this.window.$('#selectedArmazem').select2().on('change', async (e: any) => {

      this.move.oItem.storage = e.target.value;
      this.item.oItem.localStorage = e.target.value;
      this.listArmarios = await new ServiceArmario(this.store).findByName(e.target.value);
    });

    this.window.$('#selectedArmario').select2().on('change', async (e: any) => {

      if (e.target.value) {
        this.item.oItem.localAmbry = e.target.value;
        this.listShelf = await new ServicePrateleias(this.store).findByName(e.target.value)
      }
    })

    this.window.$('#selectedPrateleira').select2().on('change', (e: any) => {
      if (e.target.value) this.item.oItem.localShelf = e.target.value
    })


    this.window.$("#select_compra").flatpickr({
      dateFormat: "d, m Y",
      onChange: (selectedDates: any, dateStr: any, instance: any) => {
        this.item.oItem.dateOfPurchase = dateStr
      },
    });


    this.window.$('#selectFornecedor').select2().on('change', (e: any) => {
      if (e.target.value) { this.item.oItem.provider = e.target.value }
    })

    this.window.$('#selectedCountry').select2().on('change', (e: any) => {
      this.item.oItem.localCurrency = e.target.value
    })

    this.window.$('#selectedProduct').select2().on('change', (e: any) => {
      const valT = e.target.value
      if (valT) {
        this.item.oItem.article = valT
        this.item.oItem.articleName = JSON.parse(JSON.parse(valT.toString()).article).name
        this.item.oItem.articleId = JSON.parse(JSON.parse(valT.toString()).article).id

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
