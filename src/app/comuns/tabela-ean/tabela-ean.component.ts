import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../shared/storage.service";
import ServiceCountry from "../../Services/ServiceCountry";
import ServiceEan from "../../Services/ServiceEan";
import ServiceEanArticleOrService from 'src/app/Services/ServiceEanArticleOrService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import ServiceUnityEanArticle from 'src/app/Services/ServiceUnityEanArticle';
import ServiceTypeEanArticle from 'src/app/Services/ServiceTypeEanArticle';

@Component({
  selector: 'app-tabela-ean',
  templateUrl: './tabela-ean.component.html',
  styles: []
})
export class TabelaEanComponent implements OnInit {

  protected list_ean_produto: any[] = [];


  listArticleEan: any[] = [];

  eanArticles: ServiceEanArticleOrService;
  private window = (<any>window);
  ngOnInit(): void {

    this.initJQuerysFunciotions()
  }

  constructor(private store: StorageService) {

    this.eanArticles = new ServiceEanArticleOrService(this.store);
    this.findAllEans();

    // data.unity_data = ;
  }


  async findAllEans(id: any = "") {
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
    this.window.$(($: any) => {
      $('#selectProdutos').on('change', (e: any) => {
        this.findAllEans(e.target.options[e.target.selectedIndex].value);
        
      })

    })
  }

  deleteSelectedEan(id: string) {
    this.store.deleted(ServiceEan.STORAGE_NAME_EAN, id).then(() => {
      this.window.sentMessageSuccess.init('foi inserido com sucesso')
    }, err => {

    })
  }


  public listenersData() {
    this.findAllEans();
  }

  async findUnity(e: string) {
    return await new ServiceUnityEanArticle(this.store).findById(e)

  }


}
