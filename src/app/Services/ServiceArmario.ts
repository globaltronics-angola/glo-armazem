import {StorageService} from "../shared/storage.service";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";


export default class ServiceArmario {

   static STORAGE_ARMARIOS: string = "global-armarios"

  static LISTA_ARMAZEM_ARMARIOS: any[] = []


  static async findAll(store: StorageService) {
    return await firstValueFrom(store.findAll(ServiceArmario.STORAGE_ARMARIOS).pipe(
      map(resp => {
          return resp.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
          })
        }
      )))
  }

  /**
   *
   * @param store
   * @param attr
   * >>
   * *** Objectivo ***
   * esta função recebe o Servico do Firestore, que caso é a instancia do ***AngularFirestore*** recebe o atributo
   * do string para retornar uma lista filtrada de armarios do armazem
   *
   * @return Promise<any[]>
   */
  static async findAllByArmazem(store: StorageService, attr: string): Promise<any[]> {
    return await firstValueFrom(store.findAll(ServiceArmario.STORAGE_ARMARIOS).pipe(
      map(resp => {
          return resp.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
          }).filter(a => a.armazem = attr)
        }
      )))
  }


}
