import {StorageService} from "../shared/storage.service";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";

export default class ServiceEan {

  static STORAGE_NAME_EAN: string = "global-ean-referencias"
  static STORAGE_NAME_TIPOITENS: string = "global-tipo-itens"
  static STORAGE_NAME_UNIDADE: string = "global-unidade-medida"
  static STORAGE_PRODUCT: string = 'global-produtos'


  static async findAll(store: StorageService) {
    return await firstValueFrom(store.findAll(ServiceEan.STORAGE_NAME_EAN).pipe(
      map(resp => {
        return resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;

          if (data.type_item)
            store.findById(ServiceEan.STORAGE_NAME_TIPOITENS, data.type_item).subscribe(
              dataSet => {
                data.type_data = dataSet
              }
            )
          data.product_data = 'NULL'
          if (data.product_key)
            store.findById(ServiceEan.STORAGE_PRODUCT, data.product_key).subscribe(
              dataProdUU => {
                data.product_data = dataProdUU
              }
            )


          return data;
        })
      })
    ))
  }
}
