import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/auth.service";
import {StorageService} from "../../../../shared/storage.service";
import ServiceArticles from 'src/app/Services/ServiceArticles';
import {Observable, Subscription, switchMap} from "rxjs";
import ServiceCategories from 'src/app/Services/ServiceCategories';
import ServiceUtil from 'src/app/Services/ServiceUtil';
//@ts-ignore
import articleJson from './articles_generated.json';


import {ActivatedRoute} from "@angular/router";
import * as Tagify from "@yaireo/tagify";
import {ServiceEncryptDecriptSimples} from 'src/app/Services/service-encrypt-decript-simples';
import {StorageValidateAnyService} from "../../../../shared/storage.validate.any.service";

// import * as _ from  "lodash";


@Component({
  selector: 'app-form-geral',
  templateUrl: './form-geral.component.html',
  styleUrls: ['./form-geral.component.css']
})
export class FormGeralComponent implements OnInit, OnDestroy {


  listCategories: Observable<any> | null = null;

  article: ServiceArticles;
  messageError: string = "";
  messageErrorEan: string = "";

  private window = (<any>window);

  sinKnow: Subscription | undefined

  ServiceUtil: any = ServiceUtil

  flag: boolean = true
  private validations: StorageValidateAnyService


  constructor(private auth: AuthService, private store: StorageService,
              private route: ActivatedRoute) {

    this.article = new ServiceArticles(this.store);

    this.listCategories = new ServiceCategories(this.store).findAll();
    this.validations = new StorageValidateAnyService(this.store, ServiceArticles.STORAGE_ARTICLES)

  }

  corrigir() {
    // @ts-ignore
    setTimeout(() => {
      articleJson.forEach(e => {
        let o = new ServiceArticles(this.store);
        o.Article = e;
        o.Article.updated_mode = true;
        o.Article.category_id = e?.category_id.split(',')
        o.save()


      })
    }, 2000)


  }

  async ngOnInit() {

    this.window.InstanceAplication.init()
    try {
      if (this.route.snapshot.paramMap.get('article_instance_select')) {


        let data: any = ServiceEncryptDecriptSimples.decript(
          //@ts-ignore
          this.route.snapshot.paramMap.get('article_instance_select')
        )

        this.flag = true;
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

  testing() {
    alert('informação')
  }

  async save() {
    try {
      await this.validateExiste()
      this.window.$("#categories").change()

      setTimeout(() => {

        this.article.save();
        this.article.Article.updated_mode = true;

        this.flag = true;
      }, 2000);
      this.article.Article.updated_mode = false;
    } catch (e) {
      this.window.sentMessageError.init(e)
    }
  }

  eventChang(): void {

    const categories = document.querySelector("#categories");


    // @ts-ignore
    new Tagify(categories, {
      originalInputValueFormat: (valuesArr: any[]) => valuesArr.map((item: any) => item.value).join(','),
      //pattern: /^[A-z][A-z_\s]|[A-z][a-z_\s]|[A-z]|[a-z]|[a-z_\s]|[À-ž_\s]+$/gm
    });

    // @ts-ignore
    categories.addEventListener('change', (e: any) => {
      this.article.Article.category_id = e.target.value.split(',')

    })


  }

  async validateExiste() {
    this.flag = false;
    await this.validations.validateExiste(this.article.Article.name, 'name', false, this.window.$('#articleName'),
      this.article.Article.updated_mode, "Já existe artigo com mesmo nome no sistema ")

    await this.validations.validateExiste(this.article.Article.ean, 'ean', true, this.window.$('#eanArticle'),
      this.article.Article.updated_mode, "já existe está referência ...")
  }

  ngTyping() {
    this.window.$('#articleName').removeClass('is-valid');
    this.window.$('#articleName').removeClass('is-invalid');
    this.window.$('#eanArticle').removeClass('is-invalid');
    this.window.$('#eanArticle').removeClass('is-valid');
    this.flag = true;
  }

}
