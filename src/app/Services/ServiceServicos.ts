import {StorageService} from "../shared/storage.service";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";


export default class ServiceServicos{

  private static STORAGE_SERVICES: string = 'global-services'

  static async findAll(store: StorageService) {
    return await firstValueFrom(store.findAll(ServiceServicos.STORAGE_SERVICES).pipe(
      map(resp => {
        return resp.map( (e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;


          return data;
        })
      })
    ))
  }


}
