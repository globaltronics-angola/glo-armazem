import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";
import {StorageService} from "../../shared/storage.service";

export default class ServiceNifClientes {

  static STORAGE_NIF_CLIENT: string = "global-nif-clients"

  static async findAll(store: StorageService) {
    return await firstValueFrom(store.findAll(ServiceNifClientes.STORAGE_NIF_CLIENT)
      .pipe(
        map(resp => {
            return resp.map((e: any) => {
              const data = e.payload.doc.data();
              data.id = e.payload.doc.id;
              return data;
            })
          }
        )
      )
    )
  }


  static async findByClients(store: StorageService) {
    return await firstValueFrom(store.findAll(ServiceNifClientes.STORAGE_NIF_CLIENT)
      .pipe(
        map(resp => {
            return resp.map((e: any) => {
              const data = e.payload.doc.data();
              data.id = e.payload.doc.id;
              return data;
            })
          }
        )
      )
    )
  }


}
