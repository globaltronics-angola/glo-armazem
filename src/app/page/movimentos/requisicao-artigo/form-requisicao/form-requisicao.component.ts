import { Component, OnInit } from '@angular/core';
import ServicePrateleias from "../../../../Services/ServicePrateleias";
import { StorageService } from "../../../../shared/storage.service";
import * as moment from "moment/moment";
import ServiceUtil from "../../../../Services/ServiceUtil";
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import * as Tagify from "@yaireo/tagify";
import ServiceCountry from "../../../../Services/ServiceCountry";
import ServiceArmazem from "../../../../Services/ServiceStorage";
import ServiceFornecedores from "../../../../Services/ServiceFornecedores";
import ServiceArmario from "../../../../Services/ServiceArmario";
import ServiceNifClient from "../../../../Services/ServiceNifClient";
import { ServiceEmitter } from "../../../../Services/ServiceEmitter";
import ServiceClients from "../../../../Services/ServiceClients";


//  import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
@Component({
  selector: 'app-form-requisicao',
  templateUrl: './form-requisicao.component.html',
  styleUrls: ['./form-requisicao.component.css']
})
export class FormRequisicaoComponent implements OnInit {
  [x: string]: any;

  eanRefeModel: any = {};
  list_produtos: any[] = []
  list_unidades: any[] = []
  list_type_items: any[] = []

  listCountriesE: any[] = []
  listRequisition: any[] = []

  itensCompra: any = {}
  listItemsCompra: any[] = []

  listArmazem: any[] = []

  movement: any = {}

  idMovement: string = ""
  ServiceArmario: ServiceArmario | any;
  ServicePrateleira: ServicePrateleias | any;

  listFornecedores: any[] = []

  TYPE_MOVEMENT: string = "REQUISITION"

  listOption: any[] = [];

  listClients: any[] = []

  constructor(private store: StorageService) {
    ServiceEmitter.get('sendItemsMovimentoSaida').subscribe(data => this.itensCompra = data)
    ServiceEmitter.get('sendItemsMovimentoSaida').subscribe(this.subcriberFunctionality)
  }

  async save() {

    const idMovement = this.idMovement

    this.movement.dateMovimento = (<any>window).instanceSelectedDateItensCompra

    this.movement.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.movement.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.movement.deleted_at = ServiceUtil.DELETED_AT_NULL;
    this.movement.email_auth = 'user activities';

    this.movement.id = idMovement

    this.movement.typeMovimento = this.TYPE_MOVEMENT

    this.movement.armazemkey = (<any>window).instanceSelectedArmazemId;

   // const listUpdated = await ServiceMovimentoItems.findTemporalAll(this.store)
   // ServiceMovimentoItems.updatedItemMovement(listUpdated, idMovement, this.store)


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
      (<any>window).InstanceAplication.init()


      // components principais

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

    this.setNewOptions();
    this.idMovement = "not found id";
    this.itensCompra.id = this.store.getId().toUpperCase()

    this.ServiceArmario = ServiceArmario;

    (<any>window).storeFire = this.store;

    // this.listClients = await ServiceNifClient.findAll(this.store);
    this.ServicePrateleira = await ServicePrateleias;

    await this.initJQuerysFunctions();

    this.listCountriesE = await ServiceCountry.findAllCountries(this.store);

    // this.list_produtos = await ServiceEan.findAll(this.store)

    this.idMovement = this.store.getId();

    // this.listArmazem = await ServiceArmazem.findAll(this.store);

    //this.listFornecedores = await ServiceFornecedores.findAll(this.store);

    this.listNewRequisition()


  }

  listNewRequisition() {
    this.store.findAll(ServiceUtil.STORAGE_TYPE_REQUISITION).subscribe(
      resp => {
        this.listRequisition = resp.map((ea: any) => {
          const data = ea.payload.doc.data();
          data.id = ea.payload.doc.id;
          return data;
        })
      }, err => {

      }
    )
  }

  async cancelerMovement(): Promise<any> {

    // const listDelete = await ServiceMovimentoItems.findTemporalAll(this.store)

    /* await listDelete.forEach((e: any) => {
      this.store.deleted(ServiceUtil.STORAGE_ITEM_MOVIMENTO, e.id).then(
        () => {
          (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
        },
        err => {

        }
      )
    }) */
  }

  campoClienteClick() {

  }

  /**
   * ***Name*** : Munzambi Ntemo Miguel
   * ***Date*** : 15 de Desembro de 2022
   *
   * ***Description*** ....
   *
   * ```ts
   * setNewOptions() {
   * this.listOption = [
   *   {id: 1, name: "Campos Cliente (Parceiro)", isselected: false},
   *   {id: 2, name: "Campos do Cliente normal", isselected: false},
   *   {id: 3, name: "Com o Campo Nif do Cliente", isselected: false},
   *   {id: 4, name: "Armazem e Localização", isselected: false},
   *   {id: 5, name: "Outro requeisitante", isselected: false} // this is other request
   * ]
   *}
   * tanks
   *
   */

  setNewOptions() {
    this.listOption = [
      { id: 0, name: "Campos do Cliente", isselected: false }
    ]
  }

  enteredNewItem() {
    this.addListItems()
  }

  subcriberFunctionality(attr: any) {
    (<any>window).$(($: any) => {
      (<any>window).instanceSelectedIdProducts = attr.ean
      $('#selectedProduct').val(attr.ean).select2();
    })
  }


  seachingClient() {



  }
}
