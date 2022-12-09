import ServiceUtil from "./ServiceUtil";
import ServiceEan from "./ServiceEan";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";
import {StorageService} from "../shared/storage.service";

export default class ServiceMovimentoItems {


  static findTemporalAll(store: StorageService) {

    return firstValueFrom(store.findAll(ServiceUtil.STORAGE_ITEM_MOVIMENTO).pipe(
      map(respY => {
        return respY.map((e: any) => {

          const querySelected = e.payload.doc.data();
          const dataW = querySelected
          dataW.id = e.payload.doc.id;


          if (dataW.ean)
            store.findById(ServiceEan.STORAGE_NAME_EAN, dataW.ean).subscribe(
              eanResp => {
                dataW.eanData = eanResp

                if (dataW.eanData)
                  store.findById(ServiceEan.STORAGE_PRODUCT, dataW.eanData.product_key).subscribe(
                    eanResPro => {
                      dataW.productData = eanResPro
                    }
                  )

                if (dataW.eanData)
                  store.findById(ServiceEan.STORAGE_NAME_TIPOITENS, dataW.eanData.type_item).subscribe(
                    eanResType => {
                      dataW.typeData = eanResType
                    }
                  )


              }
            )

          console.log(dataW)

          return dataW;

        }).filter(e => e.movimentoId == 'NULL')
      })
    ))


  }


}
