import {Component, OnInit, OnDestroy} from '@angular/core';
import {StorageService} from "../../shared/storage.service";
import * as moment from "moment/moment";
import {Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css']
})
export class TiposComponent implements OnInit, OnDestroy {

  protected type: any = {};
  private DELETED_AT_NULL: string = 'NULL' // propriety null if not deleted values
  private STORAGE_NAME: string = 'global-tipos' // nome da collection

  list_modelos$:Observable<any[]> |undefined;
sink:Subscription |undefined
  constructor(private store: StorageService) {
  this.list_modelos$ =  this.store.findAll(this.STORAGE_NAME).pipe(map(this.convertToModel))
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.initJQuerysFunctions()
  }


  save(): void {

    this.type.id = this.store.getId();

    this.type.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.type.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.type.deleted_at = this.DELETED_AT_NULL;
    this.type.email_auth = 'user activities';

    this.store.createdForceGenerateId(this.type, this.STORAGE_NAME).then(
      () => {

        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')

      },
      err => {
        alert('ocorencia de erro no sistema')
      }
    );
  }




  convertToModel(resp:any){
    return resp.map((e: any) => {
      const data = e.payload.doc.data();
      data.id = e.payload.doc.id;
      return data;
    })
  }


  private initJQuerysFunctions() {

  }




}
