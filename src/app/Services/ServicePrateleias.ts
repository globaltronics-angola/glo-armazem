import {StorageService} from "../shared/storage.service";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";


export default class ServicePrateleias {

  private static STORAGE_PREATELEIRAS: string = "global-prateleiras"
  static LISTA_ARMARIOS_PRATELEIRAS: any[] = []

  static async findAll(store: StorageService) {
    return await firstValueFrom(store.findAll(ServicePrateleias.STORAGE_PREATELEIRAS).pipe(
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
   * do string para retornar uma lista filtrada de prateleiras de um determinado armario
   *
   * @return Promise<any[]>
   */
  static async findAllByArmario(store: StorageService, attr: string): Promise<any[]> {
    return await firstValueFrom(store.findAll(ServicePrateleias.STORAGE_PREATELEIRAS).pipe(
      map(resp => {
          return resp.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
          }).filter(a => a.armario = attr)
        }
      )))
  }

}
