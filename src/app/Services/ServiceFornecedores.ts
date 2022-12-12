import {StorageService} from "../shared/storage.service";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";


export default class ServiceFornecedores {

  private static STORAGE_FORNECEDORES: string = "global-forncedores"


  static async findAll(store: StorageService) {
    return await firstValueFrom(store.findAll(ServiceFornecedores.STORAGE_FORNECEDORES).pipe(
      map(resp => {
          return resp.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
          })
        }
      )))
  }


}
