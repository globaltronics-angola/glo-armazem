import {StorageService} from "../shared/storage.service";
import {firstValueFrom, of} from "rxjs";
import {concatMap, flatMap, map, mergeMap, switchMap,tap} from "rxjs/operators";


export default class ServiceFornecedor {

  static STORAGE_FORNECEDOR: string = "global-forncedores"
  static STORAGE_DEPARTMENTS: string = "global-departments"

  static async findAll2(store: StorageService) {
    return await firstValueFrom(store.findAll(this.STORAGE_FORNECEDOR).pipe(
      map(resp => {
        return resp.map((e: any) => {
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


  static async findAll(store: StorageService) {
    return await firstValueFrom(store.findAll(this.STORAGE_FORNECEDOR).pipe(
      map(resp => resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      )
    ))
  }


  static findDepartment(store: StorageService , id: string){
    return firstValueFrom(store.findById(this.STORAGE_DEPARTMENTS, id).pipe(tap(val=>{
      console.log(val);
      return val

    })))
  }

}
