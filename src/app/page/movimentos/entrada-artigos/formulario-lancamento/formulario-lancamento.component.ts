import {Component, Input, OnInit} from '@angular/core';
import ServiceCountry from "../../../../Services/ServiceCountry";
import {StorageService} from "../../../../shared/storage.service";
import * as Tagify from "@yaireo/tagify";
import * as moment from "moment";
import ServiceUtil from "../../../../Services/ServiceUtil";
import ServiceEan from "../../../../Services/ServiceEan";
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import ServiceArmazem from "../../../../Services/ServiceArmazem";
import ServiceArmario from "../../../../Services/ServiceArmario";
import ServicePrateleias from "../../../../Services/ServicePrateleias";
import ServiceFornecedores from "../../../../Services/ServiceFornecedores";
import ServiceEmitter from "../../../../Services/ServiceEmitter";

@Component({
  selector: 'app-formulario-lancamento',
  templateUrl: './formulario-lancamento.component.html',
  styles: []
})
export class FormularioLancamentoComponent implements OnInit {

  @Input() listener : any = {}

  eanRefeModel: any = {};
  list_produtos: any[] = []
  list_unidades: any[] = []
  list_type_items: any[] = []

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


  async onUpdated() {
    this.list_produtos = await ServiceEan.findAll(this.store)
    this.listFornecedores = await ServiceFornecedores.findAll(this.store);
  }


  constructor(private store: StorageService ) {

  }

  async save() {



    this.movement.dateMovimento = (<any>window).instanceSelectedDateItensCompra

    this.movement.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.movement.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.movement.deleted_at = ServiceUtil.DELETED_AT_NULL;
    this.movement.email_auth = 'user activities';

    this.movement.id = this.idMovement

    this.movement.typeMovimento = this.TYPE_MOVEMENT

    this.movement.armazemkey = (<any>window).instanceSelectedArmazemId;

    const listUpdatedA = await ServiceMovimentoItems.findTemporalAllInput(this.store)

    ServiceMovimentoItems.updatedItemMovement(listUpdatedA, this.idMovement, this.store)


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

    (<any>window).instanceSelectedValueOthers = "";
    (<any>window).instanceSelectedIdCountry = "";
    (<any>window).instanceSelectedDateItensCompra = "";
    (<any>window).instanceSelectedDateItensCompraMovimento = "";


    // components da localizaçao
    (<any>window).instanceSelectedArmazemId = "";
    (<any>window).instanceSelectedArmarioId = "";
    (<any>window).instanceSelectedPrateleiraId = "";
    (<any>window).instanceSelectedFornecedorId = "";

    (<any>window).listArmarios = [];


    (<any>window).$(function ($: any) {

      // components da localização

      $('#selectedArmazem').select2().on('change', async (e: any) => {
        (<any>window).instanceSelectedArmazemId = e.target.value

        ServiceArmario.LISTA_ARMAZEM_ARMARIOS = await ServiceArmario.findAllByArmazem((<any>window).storeFire, e.target.value)
      })

      $('#selectedArmario').select2().on('change', async (e: any) => {
        (<any>window).instanceSelectedArmarioId = e.target.value
        ServicePrateleias.LISTA_ARMARIOS_PRATELEIRAS = await ServicePrateleias.findAllByArmario((<any>window).storeFire, e.target.value)
      })

      $('#selectedPrateleira').select2().on('change', (e: any) => {
        (<any>window).instanceSelectedPrateleiraId = e.target.value
      })

      $('#selectFornecedor').select2().on('change', (e: any) => {
        (<any>window).instanceSelectedFornecedorId = e.target.value
      })


      // components principais

      $('#selectedCountry').select2().on('change', (e: any) => {
        (<any>window).instanceSelectedIdCountry = e.target.value
      })

      $('#selectedProduct').select2().on('change', (e: any) => {
        (<any>window).instanceSelectedIdProducts = e.target.value
      })


      $("#select_compra").flatpickr({
        dateFormat: "d, m Y",
        onChange: function (selectedDates: any, dateStr: any, instance: any) {
          (<any>window).instanceSelectedDateItensCompra = dateStr
        }
      });

      $("#select_data_movimento").flatpickr({
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
        (<any>window).instanceSelectedValueOthers = e.target.value
      })


    })

  }

  addListItems() {
    this.itensCompra.others = (<any>window).instanceSelectedValueOthers.split(',')

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

    this.itensCompra.id = this.store.getId().toUpperCase()

    this.store.createdForceGenerateId(this.itensCompra, ServiceUtil.STORAGE_ITEM_MOVIMENTO).then(
      resp => {
        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
      },
      err => {
        alert('Ocorreu um determido erro ')
      }
    );


  }

  async ngOnInit() {

    (<any>window).storeFire = this.store;


    this.ServiceArmario = ServiceArmario;
    this.ServicePrateleira = ServicePrateleias;

    this.initJQuerysFunctions()

    this.list_countries = await ServiceCountry.findAllCountries(this.store)

    this.list_produtos = await ServiceEan.findAll(this.store)

    this.idMovement = this.store.getId();

    this.listArmazem = await ServiceArmazem.findAll(this.store);

    this.listFornecedores = await ServiceFornecedores.findAll(this.store);

  }


  async cancelerMovement(): Promise<any> {

    const listDelete = await ServiceMovimentoItems.findTemporalAll(this.store)

    await listDelete.forEach((e: any) => {
      this.store.deleted(ServiceUtil.STORAGE_ITEM_MOVIMENTO, e.id).then(
        () => {
          (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
        },
        err => {

        }
      )
    })
  }

  calcularQuantidades(){

    const listPendnts = [];

  }

  ngOnDestroy() {
   // this._emitters.emitter.unsubscribe();
  }
}