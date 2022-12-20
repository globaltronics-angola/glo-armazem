import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../shared/storage.service";
import * as moment from "moment";
import ServiceCategories from 'src/app/Services/ServiceCategories';

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
  category: ServiceCategories;

  ngOnInit(): void {
    this.findAllCategories()
    this.initJQueryFunctions()
  }

  constructor(private store: StorageService) {
    this.category = new ServiceCategories(this.store);
  }


  save() {
    this.categoria.save()
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
