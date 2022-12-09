import {StorageService} from "../shared/storage.service";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";

export default class ServiceTipos {

  private static STORAGE_NAME: string = "global-tipos"

  static async findAll(store: StorageService) {
    return await firstValueFrom(store.findAll(this.STORAGE_NAME).pipe(
      map(resp => {
        return resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;

          return data;
        })
      })
    ))
  }

}
