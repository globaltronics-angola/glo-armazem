import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../../../shared/storage.service";
import * as moment from "moment";

@Component({
  selector: 'app-tipo-items',
  templateUrl: './tipo-items.component.html',
  styles: [
  ]
})
export class TipoItemsComponent implements OnInit{

  protected list_tipos: any[] = []

  protected tiposItens: any = {}

  private DELETED_AT_NULL: string = "NULL"
  private STORAGE_NAME_TIPOITENS: string = "global-tipo-itens"


  constructor(private store: StorageService) {
  }


  save() {
    this.tiposItens.id = this.store.getId();
    this.tiposItens.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.tiposItens.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.tiposItens.deleted_at = this.DELETED_AT_NULL;
    this.tiposItens.email_auth = 'user activities';


    this.store.createdForceGenerateId(this.tiposItens, this.STORAGE_NAME_TIPOITENS).then(
      () => {
        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
      },
      err => {
        alert('ocorencia de erro no sistema')
      }
    );
  }

  ngOnInit(): void {

    this.findAllTypeItems()
  }


  findAllTypeItems() {}
}
