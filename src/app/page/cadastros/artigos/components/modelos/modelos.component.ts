import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../../../shared/storage.service";
import * as moment from "moment/moment";
import ServiceModelArticle from 'src/app/Services/ServiceModelArticle';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styles: []
})
export class ModelosComponent implements OnInit {

  protected listModelArticles: Promise<any[]> | undefined;
  modelArticle: ServiceModelArticle;

  constructor(private store: StorageService) {
    this.modelArticle = new ServiceModelArticle(this.store)
    this.listModelArticles = this.modelArticle.findAll()
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  save() {
    this.modelArticle.save()
  }

}

