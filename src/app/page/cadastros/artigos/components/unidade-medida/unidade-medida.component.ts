import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../../../shared/storage.service";
import ServiceUnityEanArticle from 'src/app/Services/ServiceUnityEanArticle';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-unidade-medida',
  templateUrl: './unidade-medida.component.html',
  styles: []
})
export class UnidadeMedidaComponent implements OnInit {


  unityArticle: ServiceUnityEanArticle;
  listUnityArticle: Observable<any[]>;

  constructor(private store: StorageService) {
    this.unityArticle = new ServiceUnityEanArticle(this.store);
    this.listUnityArticle = this.unityArticle.findAll();
  }

  ngOnInit(): void {}

  save() {
    this.unityArticle.save();
  }

  editing(data: any) {
    this.unityArticle.IObjectClass = data;
    this.unityArticle.IObjectClass.updated_mode = true;
  }

  delete(model: any) {
    this.unityArticle.IObjectClass = model;
    this.unityArticle.delete()
  }

}
