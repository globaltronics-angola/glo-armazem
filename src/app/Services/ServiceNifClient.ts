import {StorageService} from "../shared/storage.service";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";



export default class ServiceNifClient {

  static STORAGE_CLIENTS: string = "global-clients"
  static STORAGE_DEPARTMENTS: string = "global-departments"
  static STORAGE_NIF_CLIENTS: string = "global-nif-clients"

  static async findAll(store: StorageService) {
    return await firstValueFrom(store.findAll(ServiceNifClient.STORAGE_NIF_CLIENTS).pipe(
      map(resp => {
        return resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;

          if (data.clientId)
            store.findById(this.STORAGE_CLIENTS, data.clientId).subscribe(
              dataSet => {
                data.clienteObj = dataSet
              }
            )

          console.log(data)
          return data;
        })
      })
    ))
  }


}
