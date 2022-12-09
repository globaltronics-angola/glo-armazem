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
    (<any>window).instanceSelectedId = "null"
    this.findAllCategories()
    this.initJQueryFunctions()
  }

  constructor(private store: StorageService) {
  }


  save() {

    const now = new Date();

    this.categoria.id = "";
    this.categoria.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.categoria.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.categoria.deleted_at = this.DELETED_AT_NULL;
    this.categoria.email_auth = 'user activities';
    this.categoria.categories_id = (<any>window).instanceSelectedId;

    this.store.create(this.categoria, this.STORAGE_NAME_CATEGORIA).then(
      () => {

        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')

      },
      err => {
        alert('ocorencia de erro no sistema')
      }
    );
  }

  findAllCategories() {
    this.store.findAll(this.STORAGE_NAME_CATEGORIA).subscribe(
      resp => {
        this.list_categorias = resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      err => {
      }
    )

  }

  initJQueryFunctions() {

    (<any>window).$(function ($: any) {

      $('#select_categorias').select2();

      $('#select_categorias').select2();

      $('#select_categorias').on('change', (event: any) => {
        (<any>window).instanceSelectedId = event.target.value
      })
    })

  }
}
