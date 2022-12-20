import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../../../shared/storage.service";
import * as moment from "moment/moment";

@Component({
  selector: 'app-unidade-medida',
  templateUrl: './unidade-medida.component.html',
  styles: []
})
export class UnidadeMedidaComponent implements OnInit {

  private STORAGE_NAME_UNIDADE: string = "global-unidade-medida"
  private DELETED_AT_NULL: string = "NULL"
  list_unidades: any[] = []

  protected unidadeMedida: any = {}

  constructor(private store: StorageService) {
  }

  ngOnInit(): void {


    this.findAllUnidades()
  }

  findAllUnidades() {}

  save() {

    this.unidadeMedida.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.unidadeMedida.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.unidadeMedida.deleted_at = this.DELETED_AT_NULL;
    this.unidadeMedida.email_auth = 'user activities';
    this.unidadeMedida.id = this.store.getId();

    this.store.createdForceGenerateId(this.unidadeMedida, this.STORAGE_NAME_UNIDADE).then(
      () => {
        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
      },
      err => {
        alert('ocorencia de erro no sistema')
      }
    );
  }
}
