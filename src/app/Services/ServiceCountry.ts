import {StorageService} from "../shared/storage.service";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";


export default class ServiceCountry {

  static STORAGE_COUNTRIES: string = "global-paises"

  static async findAllCountries(store: StorageService) {
    return await firstValueFrom(store.findAll(ServiceCountry.STORAGE_COUNTRIES).pipe(
      map(resp => {
          return resp.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
          })
        }
      )))
  }

  static async findCountryById(store: StorageService, id: string) {

    return await firstValueFrom(store.findById(ServiceCountry.STORAGE_COUNTRIES, id).pipe(
      map(
        (respCounty: any) => {
          return respCounty
        }
      )));

  }
}
