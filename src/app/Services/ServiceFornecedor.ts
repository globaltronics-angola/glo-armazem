import {StorageService} from "../shared/storage.service";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";



export default class ServiceFornecedor {

  private static STORAGE_FORNECEDOR: string = "global-forncedores"
  private static STORAGE_DEPARTMENTS: string = "global-departments"

  static async findAll(store: StorageService) {
    return await firstValueFrom(store.findAll(this.STORAGE_FORNECEDOR).pipe(
      map(resp => {
        return resp.map( (e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;

          if (data.departmentId)
            store.findById(this.STORAGE_DEPARTMENTS, data.departmentId).subscribe(
              dataSet => {
                data.departmentObj = dataSet
              }
            )

          console.log(data)
          return data;
        })
      })
    ))
  }


}
