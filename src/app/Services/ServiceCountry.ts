import { StorageService } from "../shared/storage.service";
import { firstValueFrom } from "rxjs";
import { map, tap } from "rxjs/operators";


export default class ServiceCountry {

  static STORAGE_COUNTRIES: string = "global-countries";

  constructor(private store: StorageService) { }

  static findAll(store: StorageService) {
    return store.findAll(ServiceCountry.STORAGE_COUNTRIES).pipe(
      map(resp => {
        return resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      }
      ))
  }

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

  static findOrderBy(store: StorageService) {
    let data = store.findAllOrderName(ServiceCountry.STORAGE_COUNTRIES);
    console.log(data)
    return data
  }


  public async findById(id: string) {
    return await firstValueFrom(this.store.findById(ServiceCountry.STORAGE_COUNTRIES, id)
      .pipe(tap(val => {
        return val
      })))
  }
}
