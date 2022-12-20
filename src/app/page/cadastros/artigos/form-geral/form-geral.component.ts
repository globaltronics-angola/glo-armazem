import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../shared/auth.service";
import { StorageService } from "../../../../shared/storage.service";
import { Products } from "../../../../model/products";
import * as moment from "moment";
import ServiceArticles from 'src/app/Services/ServiceArticles';


@Component({
  selector: 'app-form-geral',
  templateUrl: './form-geral.component.html',
  styleUrls: ['./form-geral.component.css']
})

export class FormGeralComponent implements OnInit {

  products: Products[] = [];
  list_modelos: any = [];
  productObj: any = {};
  list_categories: any = [];

  private STORAGE_MODELOS: string = 'global-modelos'
  private STORAGE_PRODUCT: string = 'global-articles'
  private STORAGE_CATEGORIES: string = 'global-categorias'

  private DELETED_AT_NULL: string = 'NULL'
  article: ServiceArticles;

  constructor(private auth: AuthService,
    private store: StorageService) {
      this.article = new ServiceArticles(this.store);
    }

  ngOnInit(): void {

    (<any>window).InstanceAplication.init()

    this.eventChang();

  }

  save() {

    this.article.Article.model_id = (<any>window).instanceSelectedId;
    this.article.Article.category_id = (<any>window).instanceSelectedIdCategories;
    this.article.save();
  }






  eventChang(): void {

    (<any>window).$(($: any) => {

      $('#modelos').select2().on('change', (event: any) => {
        (<any>window).instanceSelectedId = event.target.value
      })
      $('#categorias').select2().on('change', (event: any) => {
        (<any>window).instanceSelectedIdCategories = $('#categorias').select2("val");
      })

    })


  }
}
