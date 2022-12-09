import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../../shared/storage.service";
import ServiceUtil from "../../../../Services/ServiceUtil";
import ServiceEan from "../../../../Services/ServiceEan";
import ServiceCountry from "../../../../Services/ServiceCountry";

@Component({
  selector: 'app-tabela-item-entrada',
  templateUrl: './tabela-item-entrada.component.html',
  styles: []
})
export class TabelaItemEntradaComponent implements OnInit {

  list_items: any[] = []

  constructor(private store: StorageService) {
  }

  ngOnInit(): void {
    this.findAllItemTemporal()

  }


  findAllItemTemporal() {

    this.store.findAll(ServiceUtil.STORAGE_ITEM_MOVIMENTO).subscribe(
      respY => {
        this.list_items = respY.map((e: any) => {

          const querySelected = e.payload.doc.data();
          const dataW = querySelected
          dataW.id = e.payload.doc.id;


          if (dataW.ean)
            this.store.findById(ServiceEan.STORAGE_NAME_EAN, dataW.ean).subscribe(
              eanResp => {
                dataW.eanData = eanResp

                if (dataW.eanData)
                  this.store.findById(ServiceEan.STORAGE_PRODUCT, dataW.eanData.product_key).subscribe(
                    eanResPro => {
                      dataW.productData = eanResPro
                    }
                  )

                if (dataW.eanData)
                  this.store.findById(ServiceEan.STORAGE_NAME_TIPOITENS, dataW.eanData.type_item).subscribe(
                    eanResType => {
                      dataW.typeData = eanResType
                    }
                  )


              }
            )


          if (dataW.paises)
            this.store.findById(ServiceCountry.STORAGE_COUNTRIES, dataW.paises).subscribe(
              moedas => {
                dataW.moeda = moedas
              }
            )

          console.log(dataW)

          return dataW;

        }).filter(e => e.movimentoId == 'NULL')
      },
      err => {
      }
    )
  }

  kFormatter(num: number) {
    // @ts-ignore
    return num;//Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  }
}
