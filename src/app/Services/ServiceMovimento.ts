import ServiceUtil from "./ServiceUtil";
import ServiceEan from "./ServiceEan";
import {firstValueFrom} from "rxjs";
import {map} from "rxjs/operators";
import {StorageService} from "../shared/storage.service";

export default class ServiceMovimento {


  static find(store: StorageService) {

    return firstValueFrom(store.findAll(ServiceUtil.STORAGE_MOVEMENT).pipe(
      map(respY => {
        return respY.map((e: any) => {

          const querySelected = e.payload.doc.data();
          const dataW = querySelected
          dataW.id = e.payload.doc.id;


          store.findAll(ServiceUtil.STORAGE_ITEM_MOVIMENTO).subscribe(
            (resp: any) => {
              dataW.itemMoviment = resp.map((as: any) => {
                let dateShits = as.payload.doc.data();
                dateShits.id = as.payload.doc.id;
                return dateShits
              }).filter((an: any) => an.movimentoId == dataW.id)
            }, err => {

            }
          )

          return dataW;

        }).filter(e => e.typeMovimento == 'REQUISITION')
      })
    ))


  }

  static findINPUT(store: StorageService) {

    return firstValueFrom(store.findAll(ServiceUtil.STORAGE_MOVEMENT).pipe(
      map(respY => {
        return respY.map((e: any) => {

          const querySelected = e.payload.doc.data();
          const dataW = querySelected
          dataW.id = e.payload.doc.id;


          store.findAll(ServiceUtil.STORAGE_ITEM_MOVIMENTO).subscribe(
            (resp: any) => {
              dataW.itemMoviment = resp.map((as: any) => {
                let dateShits = as.payload.doc.data();
                dateShits.id = as.payload.doc.id;
                return dateShits
              }).filter((an: any) => an.movimentoId == dataW.id)
            }, err => {

            }
          )

          return dataW;

        }).filter(e => e.typeMovimento == 'INPUT')
      })
    ))


  }
}
