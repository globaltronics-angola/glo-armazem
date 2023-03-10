import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../shared/storage.service";
import ServiceCategories from 'src/app/Services/ServiceCategories';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {

  category: ServiceCategories;
  protected listCategories: Observable<any>| null = null;
  ;

  private window: any = (<any>window)


  ngOnInit(): void {
    this.initJQueryFunctions()
  }

  constructor(private store: StorageService) {
    this.category = new ServiceCategories(this.store);
    this.listCategories = this.category.findAll();
  }


  save() {

    this.category.Categories.category_id = this.window.instanceSelectedId
    this.category.save()
  }

  initJQueryFunctions() {
    this.window.instanceSelectedId = "NULL";

    const selectCategory = this.window.$('#select_categorias');
    selectCategory.select2().on('change', (event: any) => {
      this.window.instanceSelectedId = event.target.value
    })
  }

  editing(category: any) {
    this.category.Categories = category;
    this.category.Categories.updated_mode = true

  }

  delete(category: any) {
    this.category.Categories = category;
    this.category.delete()
  }

}
