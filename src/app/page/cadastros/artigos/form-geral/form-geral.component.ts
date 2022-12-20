import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "../../../../shared/auth.service";
import { StorageService } from "../../../../shared/storage.service";
import ServiceArticles from 'src/app/Services/ServiceArticles';
import ServiceModelArticle from 'src/app/Services/ServiceModelArticle';
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-form-geral',
  templateUrl: './form-geral.component.html',
  styleUrls: ['./form-geral.component.css']
})

export class FormGeralComponent implements OnInit {


  listModel: Observable<any>;
  list_categories: any = [];

  article: ServiceArticles;
  private window = (<any>window);

  sinKnow: Subscription | undefined

  constructor(private auth: AuthService,
    private store: StorageService) {

    this.article = new ServiceArticles(this.store);
    this.listModel = new ServiceModelArticle(this.store).findAll();
  }

  ngOnInit(): void {
    this.window.InstanceAplication.init()
    this.eventChang();
  }

  save() {
    this.article.Article.model_id = this.window.instanceSelectedId;
    this.article.Article.category_id = this.window.instanceSelectedIdCategories;
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
