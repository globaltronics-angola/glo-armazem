import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../../../shared/storage.service";
import ServiceTypeEanArticle from 'src/app/Services/ServiceTypeEanArticle';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tipo-items',
  templateUrl: './tipo-items.component.html',
  styles: [
  ]
})
export class TipoItemsComponent implements OnInit {


  typeItem: ServiceTypeEanArticle;
  listTypeEanArticle: Observable<any[]>;


  constructor(private store: StorageService) {
    this.typeItem = new ServiceTypeEanArticle(this.store);
    this.listTypeEanArticle = this.typeItem.findAll();
  }


  save() {
    this.typeItem.save();
  }

  ngOnInit(): void {}

  editing(data: any) {
    this.typeItem.IObjectClass = data;
    this.typeItem.IObjectClass.updated_mode = true;
  }

  delete(model: any) {
    this.typeItem.IObjectClass = model;
    this.typeItem.delete()
  }
}
