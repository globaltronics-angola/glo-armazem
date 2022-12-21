import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from "../../shared/storage.service";
import ServiceCountry from "../../Services/ServiceCountry";
import ServiceEan from "../../Services/ServiceEan";
import ServiceEanArticleOrService from 'src/app/Services/ServiceEanArticleOrService';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import ServiceUnityEanArticle from 'src/app/Services/ServiceUnityEanArticle';
import ServiceTypeEanArticle from 'src/app/Services/ServiceTypeEanArticle';
import { ServiceEmitter } from 'src/app/Services/ServiceEmitter';

@Component({
  selector: 'app-tabela-ean',
  templateUrl: './tabela-ean.component.html',
  styles: []
})
export class TabelaEanComponent implements OnInit, OnDestroy {


  protected list_ean_produto: any[] = [];


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

    this.snKnow = ServiceEmitter.get("sendNewLine").subscribe(this.findAllEan)
    // data.unity_data = ;
  }
  
  ngOnDestroy(): void {
    this.snKnow?.unsubscribe();
  }

  async findAllEan(id: any = "") {

    this.listArticleEan = await new ServiceEanArticleOrService(this.store)
      .findByArticleId(id);

    this.listArticleEan
      .map(async e => e.unity_data = await new ServiceUnityEanArticle(this.store)
        .findById(e.unity_id));

    this.listArticleEan.map(async e => e.country_data = await new ServiceCountry(this.store)
      .findById(e.country_id));

    this.listArticleEan.map(async e => e.type_data = await new ServiceTypeEanArticle(this.store)
      .findById(e.type_id));

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
    this.store.deleted(ServiceEan.STORAGE_NAME_EAN, id).then(() => {
      this.window.sentMessageSuccess.init('foi inserido com sucesso')
    }, err => { })
  }

  async findUnity(e: string) {
    return await new ServiceUnityEanArticle(this.store).findById(e)
  }


}
