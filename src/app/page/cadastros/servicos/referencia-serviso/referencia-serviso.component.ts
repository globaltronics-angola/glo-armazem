import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../../shared/storage.service";
import * as moment from "moment";

@Component({
  selector: 'app-referencia-serviso',
  templateUrl: './referencia-serviso.component.html',
  styles: [
  ]
})
export class ReferenciaServisoComponent implements OnInit{


  private STORAGE_PRODUCT: string = 'global-services'
  private STORAGE_MODELOS: string = 'global-tipos'
  private STORAGE_CATEGORIES: string = 'global-categorias'
  private STORAGE_NAME_TIPOITENS: string = "global-tipo-itens"
  private STORAGE_NAME_UNIDADE: string = "global-unidade-medida"
  private STORAGE_NAME_EAN: string = "global-ean-referencias"
  private DELETED_AT_NULL: string = "NULL"


  public list_type_items: any[] = []
  public list_unidades: any[] = []
  public list_produtos: any[] = [];

  protected eanRefeModel: any = {}

  ngOnInit(): void {
    this.findAllService()
    this.findAllTypeItems()
    this.initJQuerysInits()
    this.findAllUnidades()
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

  findAllService() {
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

  initJQuerysInits() {

    (<any>window).$(function ($: any) {
      $('#selectProdutos').select2()
        .on('change', (e: any) => {
          (<any>window).instanceSelectedIdProduct = e.target.value
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

    this.eanRefeModel.created_at = moment().format('DD MM, YYYY HH:mm:ss')
    this.eanRefeModel.updated_at = moment().format('DD MM, YYYY HH:mm:ss')

    this.eanRefeModel.deleted_at = this.DELETED_AT_NULL;
    this.eanRefeModel.email_auth = 'user activities';

    this.eanRefeModel.product_key = (<any>window).instanceSelectedIdProduct;


    console.log(this.eanRefeModel)

    this.store.create(this.eanRefeModel, this.STORAGE_NAME_EAN).then(
      () => {
        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
      },
      err => {
        alert('ocorencia de erro no sistema')
      }
    );
  }


}
