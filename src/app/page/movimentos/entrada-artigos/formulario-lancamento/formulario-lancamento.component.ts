import {Component, OnInit} from '@angular/core';
import ServiceCountry from "../../../../Services/ServiceCountry";
import {StorageService} from "../../../../shared/storage.service";
import * as Tagify from "@yaireo/tagify";
import * as moment from "moment";
import ServiceUtil from "../../../../Services/ServiceUtil";
import ServiceEan from "../../../../Services/ServiceEan";
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";

@Component({
  selector: 'app-formulario-lancamento',
  templateUrl: './formulario-lancamento.component.html',
  styles: []
})
export class FormularioLancamentoComponent implements OnInit {

  eanRefeModel: any = {};
  list_produtos: any[] = []
  list_unidades: any[] = []
  list_type_items: any[] = []

  list_countries: any[] = []

  itensCompra: any = {}
  listItemsCompra: any[] = []
  movement: any = {}

  idMovement : string = ""

  constructor(private store: StorageService) {
  }

  async save() {

    const idMovement = this.idMovement

    this.movement.dateMovimento = (<any>window).instanceSelectedDateItensCompra

    this.movement.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.movement.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.movement.deleted_at = ServiceUtil.DELETED_AT_NULL;
    this.movement.email_auth = 'user activities';
    this.movement.id = idMovement

    const listUpdated = await ServiceMovimentoItems.findTemporalAll(this.store)

    this.store.createdForceGenerateId(this.movement, ServiceUtil.STORAGE_MOVEMENT).then(
      () => {

        listUpdated.forEach((dataShit: any) => {

          let instanceDateItemMovement = dataShit
          instanceDateItemMovement.id = dataShit.id
          instanceDateItemMovement.movimentoId = idMovement
          instanceDateItemMovement.status = ServiceUtil.VALUE_AT_STATUS_ACTIVE

          this.store.createdForceGenerateId(instanceDateItemMovement, ServiceUtil.STORAGE_ITEM_MOVIMENTO).then(() => {
            (<any>window).sentMessageSuccess.init('Foi inserido com sucesso obrigado!')
          }, err => {
          })

        });

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


    (<any>window).$(function ($: any) {

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

    this.itensCompra.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.itensCompra.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.itensCompra.deleted_at = ServiceUtil.DELETED_AT_NULL;
    this.itensCompra.email_auth = 'user activities';

    this.itensCompra.movimentoId = ServiceUtil.VALUE_AT_NULLABLE
    this.itensCompra.status = ServiceUtil.VALUE_AT_NULLABLE

    this.itensCompra.dataCompra = (<any>window).instanceSelectedDateItensCompra

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

    this.initJQuerysFunctions()
    this.list_countries = await ServiceCountry.findAllCountries(this.store)

    this.list_produtos = await ServiceEan.findAll(this.store)

    this.idMovement = this.store.getId();
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
}
