import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../../../shared/storage.service";
import * as moment from "moment/moment";

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styles: []
})
export class ModelosComponent implements OnInit {

  modelo: any = {};
  DELETED_AT_NULL: string = 'NULL' // propriety null if not deleted values
  STORAGE_NAME: string = 'global-modelos' // nome da collection

  list_modelos: any = [];

  constructor(private store: StorageService) {
  }

  save() {

    const now = new Date();

    this.modelo.id = "";
    this.modelo.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.modelo.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.modelo.deleted_at = this.DELETED_AT_NULL;
    this.modelo.email_auth = 'user activities';

    this.store.create(this.modelo, this.STORAGE_NAME).then(
      () => {

        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')

      },
      err => {
        alert('ocorencia de erro no sistema')
      }
    );
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

  private initJQuerysFunctions(){

  }



  ngOnInit(): void {
    this.findAll()
    this.initJQuerysFunctions()
  }

}

