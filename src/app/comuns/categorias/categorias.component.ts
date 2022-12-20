import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../shared/storage.service";
import * as moment from "moment";
import ServiceCategories from 'src/app/Services/ServiceCategories';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {

  protected category: ServiceCategories;
  protected listCategories: Observable<any>;

  private window = (<any>window);


  ngOnInit(): void {
    this.findAllCategories()
    this.initJQueryFunctions()
  }

  constructor(private store: StorageService) {
    this.category = new ServiceCategories(this.store);
    this.listCategories = this.category.findAll();
  }


  save() {
    this.category.save()
  }

  findAllCategories() {
  }

  initJQueryFunctions() {
    this.window.instanceSelectedId = "";

    const selectCategory = this.window.$('#select_categorias');
    selectCategory.select2().on('change', (event: any) => {
      this.window.instanceSelectedId = event.target.value
    })


  }
}
