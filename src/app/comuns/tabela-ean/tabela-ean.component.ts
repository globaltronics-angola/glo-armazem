import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../shared/storage.service";
import ServiceCountry from "../../Services/ServiceCountry";
import ServiceEan from "../../Services/ServiceEan";
import ServiceEanArticleOrService from 'src/app/Services/ServiceEanArticleOrService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import ServiceUnityEanArticle from 'src/app/Services/ServiceUnityEanArticle';

@Component({
  selector: 'app-tabela-ean',
  templateUrl: './tabela-ean.component.html',
  styles: []
})
export class TabelaEanComponent implements OnInit {

  protected list_ean_produto: any[] = [];

  private STORAGE_NAME_EAN: string = "global-ean-referencias"
  private STORAGE_NAME_TIPOITENS: string = "global-tipo-itens"
  private STORAGE_NAME_UNIDADE: string = "global-unidade-medida"

  listArticleEan: any[] = [];

  eanArticles: ServiceEanArticleOrService;

  ngOnInit(): void {

    this.initJQuerysFunciotions()
  }

  constructor(private store: StorageService) {

    this.eanArticles = new ServiceEanArticleOrService(this.store);
    this.findAllEans();

    // data.unity_data = ;
  }


  async findAllEans() {
    this.listArticleEan = await new ServiceEanArticleOrService(this.store).findAll();
    this.listArticleEan
      .map(async e => e.unity_data = await new ServiceUnityEanArticle(this.store)
        .findById(e.unity_id));

    this.listArticleEan.map(async e => e.country_data = await new ServiceCountry(this.store)
      .findById(e.country_id));
  }


  initJQuerysFunciotions() {
    (<any>window).$(($: any) => {

      $('#selectProdutos').on('change', (e: any) => {
        // event fillters
      })

    })
  }

  deleteSelectedEan(id: string) {
    this.store.deleted(ServiceEan.STORAGE_NAME_EAN, id).then(() => {
      (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
    }, err => {

    })
  }

  async findUnity(e: string) {
    return await new ServiceUnityEanArticle(this.store).findById(e)

  }


}
