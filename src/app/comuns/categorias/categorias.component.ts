import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../shared/storage.service";
import * as moment from "moment";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {


  // indicando para um objecto que pode gerar qualquer resultado
  protected categoria: any = {}
  protected list_categorias: any[] = []
  private DELETED_AT_NULL: string = "NULL"
  private STORAGE_NAME_CATEGORIA: string = "global-categorias"

  ngOnInit(): void {


    this.findAllCategories()
    this.initJQueryFunctions()
  }

  constructor(private store: StorageService) {
  }


  save() {

    this.categoria.id = this.store.getId();

    this.categoria.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.categoria.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.categoria.deleted_at = this.DELETED_AT_NULL;
    this.categoria.email_auth = 'user activities';
    this.categoria.categories_id = (<any>window).instanceSelectedId;

    this.store.createdForceGenerateId(this.categoria, this.STORAGE_NAME_CATEGORIA).then(
      () => {

        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')

      },
      err => {
        alert('ocorencia de erro no sistema')
      }
    );
  }

  findAllCategories() {
  }

  initJQueryFunctions() {
    (<any>window).instanceSelectedId = "";
    (<any>window).$(function ($: any) {

      $('#select_categorias').select2();

      $('#select_categorias').select2();

      $('#select_categorias').on('change', (event: any) => {
        (<any>window).instanceSelectedId = event.target.value
      })
    })

  }
}
