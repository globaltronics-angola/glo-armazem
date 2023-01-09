import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../shared/auth.service";
import { StorageService } from "../../../../shared/storage.service";
import ServiceArticles from 'src/app/Services/ServiceArticles';
import ServiceModelArticle from 'src/app/Services/ServiceModelArticle';
import { Observable, Subscription } from "rxjs";
import ServiceCategories from 'src/app/Services/ServiceCategories';
import ServiceUtil from 'src/app/Services/ServiceUtil';

@Component({
  selector: 'app-form-geral',
  templateUrl: './form-geral.component.html',
  styleUrls: ['./form-geral.component.css']
})

export class FormGeralComponent implements OnInit {



  listUnity: Observable<any>;
  listModel: Observable<any> | null = null;

  listCategories: Observable<any> | null = null;

  article: ServiceArticles;


  private window = (<any>window);

  sinKnow: Subscription | undefined

  ServiceUtil: any = ServiceUtil

  constructor(private auth: AuthService, private store: StorageService) {

    this.article = new ServiceArticles(this.store);

    this.listUnity = new ServiceCategories(this.store).findAll();
    this.listModel = new ServiceModelArticle(this.store).findAll();
    this.listCategories = new ServiceCategories(this.store).findAll();
  }

  ngOnInit(): void {
    this.window.InstanceAplication.init()
    this.eventChang();
  }

  generateRef() { }
  save() {

    this.article.Article.model_id = JSON.parse(this.window.instanceSelectedId.toString());
    this.article.Article.category_id = JSON.parse('[' + this.window.instanceSelectedIdCategories.toString().replace('\n', '') + ']');

    this.article.save();
  }

  eventChang(): void {

    const modelArticles = this.window.$('#modelArticles');
    const modelCategories = this.window.$("#categories");

    modelArticles.select2().on('change', (event: any) => {
      this.window.instanceSelectedId = event.target.value
    })


    modelCategories.select2().on('change', (event: any) => {
      this.window.instanceSelectedIdCategories = modelCategories.select2("val");
    })
  }
}
