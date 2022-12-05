import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../../../shared/storage.service";

@Component({
  selector: 'app-tabela-ean',
  templateUrl: './tabela-ean.component.html',
  styles: []
})
export class TabelaEanComponent implements OnInit {

  protected list_ean_produto: any[] = [];

  private STORAGE_NAME_EAN: string = "global-ean-referencias"
  private STORAGE_NAME_TIPOITENS: string = "global-tipo-itens"
  private STORAGE_NAME_UNIDADE: string = "global-unidade-medida"

  ngOnInit(): void {
    this.findAllEans()
    this.initJQuerysFunciotions()
  }

  constructor(private store: StorageService) {
  }

  findAllEans(productKey: any = '') {
    this.store.findAll(this.STORAGE_NAME_EAN).subscribe(
      respY => {
        this.list_ean_produto = respY.map((e: any) => {


          const querySelecty = e.payload.doc.data();
          const dataW = querySelecty
          dataW.id = e.payload.doc.id;

          if (querySelecty.type_item)
            this.store.findById(this.STORAGE_NAME_TIPOITENS, querySelecty.type_item).subscribe(
              dataSet => {
                dataW.type_data = dataSet
              }
            )

          if (querySelecty.unidade_key)
            this.store.findById(this.STORAGE_NAME_UNIDADE, querySelecty.unidade_key).subscribe(
              dataSet => {
                dataW.unidade_data = dataSet
              }
            )


          return dataW;
        })
          .filter(e => e.product_key == productKey)
      },
      err => {
      }
    )
  }


  initJQuerysFunciotions() {
    (<any>window).$(($: any)=> {

      $('#selectProdutos').on('change', (e : any)=>{
        this.findAllEans(e.target.value)
      })

    })
  }


}
