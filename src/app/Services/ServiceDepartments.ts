import {StorageService} from "../shared/storage.service";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";


export default class ServiceDepartments{

  private static STORAGE_DEPARTMENTS : string = "global-departments"

  static async findCountryById(store: StorageService, id: string) {

    return await firstValueFrom(store.findById(ServiceDepartments.STORAGE_DEPARTMENTS, id).pipe(
      map(
        (respCounty: any) => {
          return respCounty
        }
      )));

  }


  static async findAll(store: StorageService) {
    return await firstValueFrom(store.findAll(ServiceDepartments.STORAGE_DEPARTMENTS).pipe(
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
