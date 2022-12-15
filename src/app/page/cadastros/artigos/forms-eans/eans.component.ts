import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../../shared/storage.service";
import * as moment from "moment/moment";
import ServiceCountry from "../../../../Services/ServiceCountry";

@Component({
  selector: 'app-forms-eans',
  templateUrl: './eans.component.html',
  styleUrls: ['./eans.component.css']
})
export class EansComponent implements OnInit {

  private STORAGE_PRODUCT: string = 'global-produtos'
  private STORAGE_MODELOS: string = 'global-modelos'
  private STORAGE_CATEGORIES: string = 'global-categorias'
  private STORAGE_NAME_TIPOITENS: string = "global-tipo-itens"
  private STORAGE_NAME_UNIDADE: string = "global-unidade-medida"
  private STORAGE_NAME_EAN: string = "global-ean-referencias"
  private DELETED_AT_NULL: string = "NULL"


  list_type_items: any[] = []
  list_unidades: any[] = []
  list_produtos: any[] = [];
  list_country: any[] = [];

  // Objecto responsavel para construir o ean
  protected eanRefeModel: any = {}


  async ngOnInit() {

    (<any>window).InstanceAplication.init()

    this.findAllProduts()
    this.findAllTypeItems()
    this.initJQuerys()
    this.findAllUnidades()
    this.list_country = await ServiceCountry.findAllCountries(this.store)


  }

  constructor(private store: StorageService) {
  }

  findAllTypeItems() {
    this.store.findAll(this.STORAGE_NAME_TIPOITENS).subscribe(
      respY => {
        this.list_type_items = respY.map((e: any) => {
          const dataW = e.payload.doc.data();
          dataW.id = e.payload.doc.id;
          return dataW;
        })
      },
      err => {
      }
    )
  }

  findAllProduts() {
    this.store.findAll(this.STORAGE_PRODUCT).subscribe(
      resp => {
        this.list_produtos = resp.map((e: any) => {

          let querySelecty: any = e.payload.doc.data();

          const data = querySelecty;

          if (querySelecty.modeloId)
            this.store.findById(this.STORAGE_MODELOS, querySelecty.modeloId).subscribe(
              dataSet => {
                data.modelo = dataSet
              }
            )

          if (querySelecty.categoriesIds) {
            data.categoriesData = [];
            querySelecty.categoriesIds.forEach((categoryID: string) => {
              this.store.findById(this.STORAGE_CATEGORIES, categoryID).subscribe(
                dataSetCategories => {
                  data.categoriesData.push(dataSetCategories);
                }
              )
            })
          }

          data.id = e.payload.doc.id;

          return data;
        })
      },
      err => {
      }
    )

  }

  initJQuerys() {
    (<any>window).instanceSelectedIdProduct = "";
    (<any>window).instanceSelectedIdCountry = "";
    (<any>window).instanceSelectedIdType = "";
    (<any>window).instanceSelectedIdMedida = "";

    (<any>window).$(function ($: any) {
      $('#selectProdutos').select2()
        .on('change', (e: any) => {
          (<any>window).instanceSelectedIdProduct = e.target.value
        })

      $('#origemEan').select2()
        .on('change', (e: any) => {
          (<any>window).instanceSelectedIdCountry = e.target.value
        })

      $('#loteSelectType').select2({
        minimumResultsForSearch: -1
      }).on('change', (e: any) => {
        (<any>window).instanceSelectedIdType = e.target.value
      })

      $('#unidadeSelected').select2({
        minimumResultsForSearch: -1
      }).on('change', (e: any) => {
        (<any>window).instanceSelectedIdMedida = e.target.value
      })


    })

  }


  findAllUnidades(): void {
    this.store.findAll(this.STORAGE_NAME_UNIDADE).subscribe(
      resp => {
        this.list_unidades = resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      err => {
      }
    )
  }


  save() {

    this.eanRefeModel.id = this.eanRefeModel.ean
    this.eanRefeModel.created_at = moment().format('DD MM, YYYY HH:mm:ss')
    this.eanRefeModel.updated_at = moment().format('DD MM, YYYY HH:mm:ss')

    this.eanRefeModel.deleted_at = this.DELETED_AT_NULL;
    this.eanRefeModel.email_auth = 'user activities';

    this.eanRefeModel.type_item = (<any>window).instanceSelectedIdType;
    this.eanRefeModel.product_key = (<any>window).instanceSelectedIdProduct;
    this.eanRefeModel.unidade_key = (<any>window).instanceSelectedIdMedida;
    this.eanRefeModel.country_key = (<any>window).instanceSelectedIdCountry;


    console.log(this.eanRefeModel)

    this.store.createForceMyId(this.eanRefeModel, this.STORAGE_NAME_EAN).then(
      () => {
        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
      },
      err => {
        alert('ocorencia de erro no sistema')
      }
    );
  }

  updated() {
  }
}
