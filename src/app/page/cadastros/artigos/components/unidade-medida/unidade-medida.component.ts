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


  unityArtice: ServiceUnityEanArticle;
  listUnityArticle: Observable<any[]>;

  constructor(private store: StorageService) {
    this.unityArtice = new ServiceUnityEanArticle(this.store);
    this.listUnityArticle = this.unityArtice.findAll();
  }

  ngOnInit(): void { }

  save() {
    this.unityArtice.save();
  }

}
