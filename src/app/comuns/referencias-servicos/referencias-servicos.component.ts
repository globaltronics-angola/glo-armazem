import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../shared/storage.service";

@Component({
  selector: 'app-referencias-servicos',
  templateUrl: './referencias-servicos.component.html',
  styles: [
  ]
})
export class ReferenciasServicosComponent implements OnInit{
  protected list_ean_sevicos: any[] = [];

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
        this.list_ean_sevicos = respY.map((e: any) => {

          const dataW = e.payload.doc.data()
          dataW.id = e.payload.doc.id;


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
