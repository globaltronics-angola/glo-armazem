import {Injectable} from "@angular/core";
import {StorageService} from "../shared/storage.service";
import ServiceUtil from "./ServiceUtil";
import {map} from "rxjs/operators";
import {serverTimestamp} from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export default class ServiceExistance {
  static STORAGE_NAME: string = "global-existence"

  constructor(private store: StorageService) {
    let user = new ServiceUtil().getSession()
    //updatedAt: serverTimestamp()
  }

  findAll() {
    return this.store.findAll(ServiceExistance.STORAGE_NAME).pipe(map(this.convertToArticle))
  }

  convertToArticle(resp: any) {
    return resp.map((e: any) => {
      return e.payload.doc.data();
    })
  }

}
