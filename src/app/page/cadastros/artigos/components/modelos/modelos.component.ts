import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../../../shared/storage.service";
import ServiceModelArticle from 'src/app/Services/ServiceModelArticle';
import { Observable, Subscription } from "rxjs";
import { ServerProvider } from 'src/provider/ServerProvider';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styles: []
})
export class ModelosComponent implements OnInit {

  protected listModelArticles: Observable<any[]> | undefined;

  modelArticle: ServiceModelArticle;

  constructor(private store: StorageService) {
    this.modelArticle = new ServiceModelArticle(this.store);
    this.listModelArticles = this.modelArticle.findAll();

    new ServerProvider();
  }

  ngOnInit() {
  }


  save() {
    this.modelArticle.save()
  }


  editing(data: any) {
    this.modelArticle.Model = data;
    this.modelArticle.Model.updated_mode = true;
  }

  delete(model: any) {
    this.modelArticle.Model = model;
    this.modelArticle.delete()
  }

}

