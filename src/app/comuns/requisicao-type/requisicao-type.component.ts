import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../shared/storage.service";
import * as moment from "moment";
import ServiceUtil from "../../Services/ServiceUtil";

@Component({
  selector: 'app-requisicao-type',
  templateUrl: './requisicao-type.component.html',
  styles: [
  ]
})
export class RequisicaoTypeComponent implements OnInit{
  protected type: any = {};
  private DELETED_AT_NULL: string = 'NULL' // propriety null if not deleted values

  protected list_modelos: any = [];

  constructor(private store: StorageService) {
  }

  save(): void {

    this.type.id = this.store.getId();

    this.type.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.type.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.type.deleted_at = this.DELETED_AT_NULL;
    this.type.email_auth = 'user activities';

    this.store.createdForceGenerateId(this.type, ServiceUtil.STORAGE_TYPE_REQUISITION).then(
      () => {

        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')

      },
      err => {
        alert('ocorencia de erro no sistema')
      }
    );
  }

  findAll() {
    this.store.findAll(ServiceUtil.STORAGE_TYPE_REQUISITION).subscribe(
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

  private initJQuerysFunctions() {

  }

  ngOnInit(): void {
    this.findAll()
    this.initJQuerysFunctions()
  }
}
