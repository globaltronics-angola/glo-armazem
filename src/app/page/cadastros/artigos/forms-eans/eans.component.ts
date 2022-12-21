import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../../shared/storage.service";
import ServiceEanArticleOrService from 'src/app/Services/ServiceEanArticleOrService';
import { Observable } from 'rxjs';
import ServiceArticles from 'src/app/Services/ServiceArticles';
import ServiceCountry from 'src/app/Services/ServiceCountry';
import ServiceTypeEanArticle from 'src/app/Services/ServiceTypeEanArticle';
import ServiceUnityEanArticle from 'src/app/Services/ServiceUnityEanArticle';
import * as moment from 'moment';

@Component({
  selector: 'app-forms-eans',
  templateUrl: './eans.component.html',
  styleUrls: ['./eans.component.css']
})
export class EansComponent implements OnInit {

  eanMode: ServiceEanArticleOrService;
  private window = (<any>window);



  protected listArticles: Observable<any>
  protected listCountry: Observable<any>
  protected listTypeItems: Observable<any>
  protected listUnity: Observable<any>

  // Objecto responsavel para construir o ean

  async ngOnInit() {

    this.window.InstanceAplication.init()
    this.initJQuerys()

  }

  constructor(private store: StorageService) {



    this.eanMode = new ServiceEanArticleOrService(this.store)

    this.listArticles = new ServiceArticles(this.store).findAll()
    this.listCountry = ServiceCountry.findAll(this.store);
    this.listTypeItems = new ServiceTypeEanArticle(this.store).findAll()
    this.listUnity = new ServiceUnityEanArticle(this.store).findAll()

  }



  initJQuerys() {

    this.window.instanceSelectedIdProduct = "";
    this.window.instanceSelectedIdCountry = "";
    this.window.instanceSelectedIdType = "";
    this.window.instanceSelectedIdMedida = "";

    const selectArticle = this.window.$('#selectProdutos')
    const selectCountry = this.window.$('#origemEan')
    const selectTypeLotEan = this.window.$('#loteSelectType')
    const selectUnity = this.window.$('#unidadeSelected')


    selectArticle.select2().on('change', (e: any) => {
      this.window.instanceSelectedIdProduct = e.target.value
    })
    selectCountry.select2().on('change', (e: any) => {
      this.window.instanceSelectedIdCountry = e.target.value
    })


    selectTypeLotEan.select2({
      minimumResultsForSearch: -1
    }).on('change', (e: any) => {
      this.window.instanceSelectedIdType = e.target.value
    })

    selectUnity.select2({
      minimumResultsForSearch: -1
    }).on('change', (e: any) => {
      this.window.instanceSelectedIdMedida = e.target.value
    })

  }


  save() {

    this.eanMode.IObjectClass.type_id = this.window.instanceSelectedIdType;
    this.eanMode.IObjectClass.article_id = this.window.instanceSelectedIdProduct;
    this.eanMode.IObjectClass.unity_id = this.window.instanceSelectedIdMedida;
    this.eanMode.IObjectClass.country_id = this.window.instanceSelectedIdCountry;

    this.eanMode.save()

  }

  generateRef() {
    // DD MM,YYYY HH:mm:ss
    if (!this.eanMode.IObjectClass.ean)
      this.eanMode.IObjectClass.ean = moment().format("HHmmssDMMYYYY");

  }
}
