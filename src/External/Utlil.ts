import {StorageService} from "../app/shared/storage.service";
import {map} from "rxjs/operators";
import {firstValueFrom} from "rxjs";


export default class Util{

  static  STORAGE_PAISES: string = "global-paises"
  static  STORAGE_CLIENTS: string = "global-clients"

  static async findAllPaises(store: StorageService) {

    return  await firstValueFrom(store.findAll(Util.STORAGE_PAISES).pipe(
      map( resp => {
        return  resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      }
    )))
  }


  static async findAllClients(store: StorageService) {
    return  await firstValueFrom(store.findAll(Util.STORAGE_CLIENTS).pipe(
      map( resp => {
          return  resp.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
          })
        },
      )))
  }
}
