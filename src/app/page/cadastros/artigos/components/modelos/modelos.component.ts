import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../../../shared/storage.service";
import ServiceModelArticle from 'src/app/Services/ServiceModelArticle';
import { Observable, Subscription } from "rxjs";

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
  }
  ngOnInit() { }

  save() {
    this.modelArticle.save()
  }

}

