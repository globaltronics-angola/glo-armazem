import {StorageService} from "../shared/storage.service";

export class ProductModel {
  public STORAGE_NAME: string = 'global-modelos';
  public list_modelos: any[] = [];


  constructor(private store: StorageService) {
    this.findAll()
  }

  findAll() {
  this.store.findAll(this.STORAGE_NAME).subscribe(
    resp => {
      this.list_modelos = resp.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    },
    err => {
    }
  )
}


}
