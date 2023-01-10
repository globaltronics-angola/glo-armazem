import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../../../../shared/auth.service";
import { StorageService } from "../../../../shared/storage.service";
import ServiceArticles from 'src/app/Services/ServiceArticles';
import ServiceModelArticle from 'src/app/Services/ServiceModelArticle';
import { Observable, Subscription, switchMap } from "rxjs";
import ServiceCategories from 'src/app/Services/ServiceCategories';
import ServiceUtil from 'src/app/Services/ServiceUtil';

//@ts-ignore
import { writeFile } from "../../../../../ServerLocal";
import { ServiceEmitter } from "../../../../Services/ServiceEmitter";
import { ActivatedRoute } from "@angular/router";
import * as Tagify from "@yaireo/tagify";
import { ServiceEncryptDecriptSimples } from 'src/app/Services/service-encrypt-decript-simples';

@Component({
  selector: 'app-form-geral',
  templateUrl: './form-geral.component.html',
  styleUrls: ['./form-geral.component.css']
})

export class FormGeralComponent implements OnInit, OnDestroy {


  listCategories: Observable<any> | null = null;

  article: ServiceArticles;


  private window = (<any>window);

  sinKnow: Subscription | undefined

  ServiceUtil: any = ServiceUtil



  constructor(private auth: AuthService, private store: StorageService, private route: ActivatedRoute) {

    this.article = new ServiceArticles(this.store);

    this.listCategories = new ServiceCategories(this.store).findAll();


  }

  async ngOnInit() {
    this.window.InstanceAplication.init()
    try {
      if (this.route.snapshot.paramMap.get('article_instance_select')) {


        let data: any = ServiceEncryptDecriptSimples.decript(
          //@ts-ignore
          this.route.snapshot.paramMap.get('article_instance_select')
          )
        let article = JSON.parse(data)

        this.article.Article = article
        this.article.Article.updated_mode = true

        //@ts-ignore
        $("#categories").val(article.category_id)
      }
    } catch (err) {
      console.table(err)
    }

    this.eventChang();
  }

  ngOnDestroy() {

  }

  generateRef() {
  }

  save() {
    this.article.save();
  }

  eventChang(): void {

    const categories = document.querySelector("#categories");


    // @ts-ignore
    new Tagify(categories, {
      originalInputValueFormat: (valuesArr: any[]) => valuesArr.map((item: any) => item.value).join(',')
    });

    // @ts-ignore
    categories.addEventListener('change', (e: any) => {
      this.article.Article.category_id = e.target.value
    })


  }
}
