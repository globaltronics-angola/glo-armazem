import { Component, Input, OnInit } from '@angular/core';
import ServiceCountry from "../../../../Services/ServiceCountry";
import { StorageService } from "../../../../shared/storage.service";
import * as Tagify from "@yaireo/tagify";
import * as moment from "moment";
import ServiceUtil from "../../../../Services/ServiceUtil";
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import ServiceArmazem from "../../../../Services/ServiceStorage";
import ServiceArmario from "../../../../Services/ServiceArmario";
import ServicePrateleias from "../../../../Services/ServicePrateleias";
import ServiceFornecedores from "../../../../Services/ServiceFornecedores";
import { ServiceEmitter } from "../../../../Services/ServiceEmitter";
import ServiceEanArticleOrService from 'src/app/Services/ServiceEanArticleOrService';
import { Observable } from 'rxjs';
import ServiceStorage from '../../../../Services/ServiceStorage';

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
  listCountries: Observable<any>;
  listArmarios: any[] = [];
  listShelf: any[] = [];


  list_countries: any[] = []

  itensCompra: any = {}
  listItemsCompra: any[] = []

  listArmazem: any[] = []

  movement: any = {}

  idMovement: string = "1111000011"
  ServiceArmario: ServiceArmario | any;
  ServicePrateleira: ServicePrateleias | any;

  listFornecedores: any[] = []

  // .typeMovimento == "INPUT"
  TYPE_MOVEMENT: string = "INPUT"





  async onUpdated() { }


  constructor(private store: StorageService) {

    this.listArticle = new ServiceEanArticleOrService(this.store).findArticles();
    this.listProvide = new ServiceFornecedores(this.store).findAll();
    this.listStorage = new ServiceStorage(this.store).findAll();
    this.listCountries = new ServiceCountry(this.store).findAll();


  }

  onTesting() {
    console.log(this.itensCompra)
  }

  async save() {


    this.movement.dateMovimento = this.window.instanceSelectedDateItensCompra

    this.movement.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.movement.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.movement.deleted_at = ServiceUtil.DELETED_AT_NULL;
    this.movement.email_auth = 'user activities';

    this.movement.id = this.idMovement

    this.movement.typeMovimento = this.TYPE_MOVEMENT

    this.movement.armazemkey = (<any>window).instanceSelectedArmazemId;

    //const listUpdatedA = await ServiceMovimentoItems.findTemporalAllInput(this.store)

    //ServiceMovimentoItems.updatedItemMovement(listUpdatedA, this.idMovement, this.store)


    this.store.createdForceGenerateId(this.movement, ServiceUtil.STORAGE_MOVEMENT).then(
      () => {
        this.idMovement = this.store.getId()
      },
      err => {
        alert('Ocorreu um determido erro ')
      }
    );


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
      this.listArmarios = await new ServiceArmario(this.store).findByIdAndName(e.target.value);
    });

    this.window.$('#selectedArmario').select2().on('change', async (e: any) => {
      this.listShelf = await new ServicePrateleias(this.store).findByIdAndName(e.target.value)
    })

    this.window.$('#selectedPrateleira').select2().on('change', (e: any) => {
      this.window.instanceSelectedPrateleiraId = e.target.value
    })


    this.window.$("#select_compra").flatpickr({
      dateFormat: "d, m Y",
      onChange: function (selectedDates: any, dateStr: any, instance: any) {
        this.window.instanceSelectedDateItensCompra = dateStr
      },
    });


    this.window.$('#selectFornecedor').select2().on('change', (e: any) => {
      (<any>window).instanceSelectedFornecedorId = e.target.value
    })

    this.window.$('#selectedCountry').select2().on('change', (e: any) => {
      (<any>window).instanceSelectedIdCountry = e.target.value
    })

    this.window.$('#selectedProduct').select2().on('change', (e: any) => {
      (<any>window).instanceSelectedIdProducts = e.target.value
    })


    this.window.$("#select_data_movimento").flatpickr({
      dateFormat: "d, m Y",
      onChange: function (selectedDates: any, dateStr: any, instance: any) {
        (<any>window).instanceSelectedDateItensCompraMovimento = dateStr
      }
    });

    const othersTagify = document.querySelector("#tagify_others");
    // @ts-ignore
    new Tagify(othersTagify, {
      originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(',')
    });

    // @ts-ignore
    othersTagify.addEventListener('change', (e: any) => {
      (<any>window).instanceSelectedValueOthers = e.target.value.split(',')
    })

  }

  addListItems() {

    console.log(this.itensCompra.id)
    this.itensCompra.others = (<any>window).instanceSelectedValueOthers

    this.itensCompra.paises = (<any>window).instanceSelectedIdCountry

    this.itensCompra.ean = (<any>window).instanceSelectedIdProducts
    this.itensCompra.typeMovimento = this.TYPE_MOVEMENT
    this.itensCompra.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.itensCompra.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.itensCompra.deleted_at = ServiceUtil.DELETED_AT_NULL;
    this.itensCompra.email_auth = 'user activities';

    this.itensCompra.movimentoId = ServiceUtil.VALUE_AT_NULLABLE
    this.itensCompra.status = ServiceUtil.VALUE_AT_NULLABLE

    this.itensCompra.fornecedor = (<any>window).instanceSelectedFornecedorId

    this.itensCompra.localizacao = [
      (<any>window).instanceSelectedArmazemId,
      (<any>window).instanceSelectedArmarioId,
      (<any>window).instanceSelectedPrateleiraId,
    ]

    this.itensCompra.dataCompra = (<any>window).instanceSelectedDateItensCompra


    this.store.createdForceGenerateId(this.itensCompra, ServiceUtil.STORAGE_ITEM_MOVIMENTO).then(
      resp => {
        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
        this.itensCompra.id = this.store.getId().toUpperCase()
      },
      err => {
        alert('Ocorreu um determido erro ')

      }
    );


  }

  async ngOnInit() {

    (<any>window).storeFire = this.store;
    this.itensCompra.id = this.store.getId().toUpperCase()

    this.ServiceArmario = ServiceArmario;
    this.ServicePrateleira = ServicePrateleias;

    //this.ServiceArmario.LISTA_ARMAZEM_ARMARIOS = await ServiceArmario.findAll(this.store)
    //this.ServicePrateleira.LISTA_ARMARIOS_PRATELEIRAS = await ServicePrateleias.findAll(this.store)

    this.initJQuerysFunctions()

    this.list_countries = await ServiceCountry.findAllCountries(this.store)

    // this.list_produtos = await ServiceEan.findAll(this.store)

    this.idMovement = this.store.getId();

    //this.listArmazem = await ServiceArmazem.findAll(this.store);


    // this.listFornecedores = await ServiceFornecedores.findAll(this.store);

  }


  async cancelerMovement(): Promise<any> {

    /* const listDelete = await ServiceMovimentoItems.findTemporalAll(this.store)

    await listDelete.forEach((e: any) => {
      this.store.deleted(ServiceUtil.STORAGE_ITEM_MOVIMENTO, e.id).then(
        () => {
          (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
        },
        err => {

        }
      )
    }) */
  }

  calcularQuantidades() {

    const listPendnts = [];

  }


  ngOnDestroy() {
    // this._emitters.emitter.unsubscribe();
    if (this.itensCompra) this.itensCompra.unsubscribe();
  }

  onSetInfoDataSource(attr: any): void {
    (<any>window).$(($: any) => {

      (<any>window).instanceSelectedValueOthers = attr.others;
      (<any>window).instanceSelectedIdCountry = attr.paisesID;
      (<any>window).instanceSelectedDateItensCompra = attr.dataCompra;

      // components da localizaçao
      (<any>window).instanceSelectedArmazemId = attr.localizacao[0];
      (<any>window).instanceSelectedArmarioId = attr.localizacao[1];
      (<any>window).instanceSelectedPrateleiraId = attr.localizacao[2];

      (<any>window).instanceSelectedFornecedorId = attr.fornecedorId;
      (<any>window).instanceSelectedIdProducts = attr.ean;


      $('#selectedArmazem').val(attr.localizacao[0]).select2();


      $('#selectedPrateleira').val(attr.localizacao[2]).select2();

      $('#selectedArmario').val(attr.localizacao[1]).select2();

      $('#selectedProduct').val(attr.ean).select2();

      $('#selectFornecedor').val(attr.fornecedorId).select2();

      $('#select_compra').val(attr.dataCompra);

      $('#selectedCountry').val(attr.paisesID).select2();


      $('#tagify_others').val(attr.others)

      $('#kt_accordion_2_item_1').addClass('show');

      console.log(attr.others)
    })

  }

  onChange($event: any) {
    console.log('hello')
    alert('i m, ')
  }
}
