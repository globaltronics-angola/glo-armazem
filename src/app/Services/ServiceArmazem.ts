import {StorageService} from "../shared/storage.service";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";


export default class ServiceArmazem {

  private static STORAGE_ARMAZENS: string = "global-armazens"

  static async findAll(store: StorageService) {
    return await firstValueFrom(store.findAll(ServiceArmazem.STORAGE_ARMAZENS).pipe(
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
