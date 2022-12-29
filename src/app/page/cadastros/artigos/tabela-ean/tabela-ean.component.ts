import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from "../../../../shared/storage.service";
import ServiceEanArticleOrService from 'src/app/Services/ServiceEanArticleOrService';
import { Subscription } from 'rxjs';

import { ServiceEmitter } from 'src/app/Services/ServiceEmitter';

@Component({
  selector: 'app-tabela-ean',
  templateUrl: './tabela-ean.component.html',
  styles: []
})
export class TabelaEanComponent implements OnInit, OnDestroy {


  static list_ean_produto: any[] = [];


  listArticleEan: any[] = [];

  eanArticles: ServiceEanArticleOrService;
  private window = (<any>window);
  snKnow: Subscription | undefined;

  ngOnInit(): void {
    this.initJQuerysFunciotions()
  }

  constructor(private store: StorageService) {

    this.eanArticles = new ServiceEanArticleOrService(this.store);
    this.findAllEan();

    this.snKnow = ServiceEmitter.get("sendNewLine").subscribe(e => this.listArticleEan.push(e));
    // data.unity_data = ;
  }

  ngOnDestroy(): void {
    this.snKnow?.unsubscribe();
  }

  async findAllEan(id: any = "") {

    this.listArticleEan = await new ServiceEanArticleOrService(this.store)
      .findByArticleId(id);


  }


  initJQuerysFunciotions() {

    const selectArticle = this.window.$('#selectProdutos');

    this.window.$(($: any) => {
      selectArticle.on('change', (e: any) => {
        this.findAllEan(e.target.options[e.target.selectedIndex].value);
      })

    })
  }

  deleteSelectedEan(id: string) {
    /* this.store.deleted(ServiceEan.STORAGE_NAME_EAN, id).then(() => {
      this.window.sentMessageSuccess.init('foi inserido com sucesso')
    }, err => { }) */
  }



}
