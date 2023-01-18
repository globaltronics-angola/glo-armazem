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


  constructor(private auth: AuthService, private store: StorageService,
              private route: ActivatedRoute) {

    this.article = new ServiceArticles(this.store);

    this.listCategories = new ServiceCategories(this.store).findAll();


  }

  corrigir() {
    // @ts-ignore
    articleJson.forEach(e => {
      let o = new ServiceArticles(this.store);
      o.Article = e;
      o.Article.updated_mode = true;
      o.Article.category_id = e?.category_id.split(',')
      o.save()
      console.log('count')

    })


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


    this.window.$("#categories").change()
    if (this.flag) {
      this.flag = false;
      setTimeout(() => {

        this.article.save();
        this.article.Article.updated_mode = true;

        this.flag = true;
      }, 2000);
    } else {
      this.window.sentMessageError.init('Não foi preenchido devidamente os compos no formulário')
    }
    this.article.Article.updated_mode = false;
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

    if (this.article.Article.updated_mode) {
      this.window.$('#articleName').removeClass('is-invalid');
      this.window.$('#articleName').removeClass('is-valid');
      this.messageError = ""
      this.flag = true;
      this.window.$('#salvarInfo').removeAttr('disabled');
      return true;
    }

    if (this.article.Article.name.trim().trim().trim().trim() == "") {
      this.window.$('#articleName').removeClass('is-valid');
      this.window.$('#articleName').addClass('is-invalid');
      this.messageError = "Não foi preenchido o campo nome do artigo."
      this.flag = false;
      return false;
    }

    if (!this.article.Article.name) {
      this.window.$('#articleName').removeClass('is-valid');
      this.window.$('#articleName').addClass('is-invalid');
      this.messageError = "Não foi preenchido o campo nome do artigo."
      this.flag = false;
      return false;
    }

    await this.store.findByOther(ServiceArticles.STORAGE_ARTICLES, 'name', this.article.Article.name).then((e: any[]) => {
      console.log(e)
      if (e.length > 0) {
        this.window.$('#articleName').removeClass('is-valid');
        this.window.$('#articleName').addClass('is-invalid');
        this.messageError = "Não foi preenchido o campo nome do artigo."
        this.flag = false;
        return false;
      } else {
        this.window.$('#articleName').removeClass('is-invalid');
        this.window.$('#articleName').addClass('is-valid');
        this.messageError = ""
        this.flag = true;
        return true;
      }
    })

    return false;
  }

  async validatedEan() {
    this.flag = false;

    if (this.article.Article.updated_mode) {
      this.window.$('#eanArticle').removeClass('is-invalid');
      this.window.$('#eanArticle').removeClass('is-valid');
      this.messageError = ""
      this.flag = true;
      return true;
    }
    if (this.article.Article.ean.trim().trim().trim() == "") {
      this.window.$('#eanArticle').removeClass('is-invalid');
      this.window.$('#eanArticle').removeClass('is-valid');
      this.messageErrorEan = ""
      this.flag = true;
      return true;
    }

    await this.store.findByOther(ServiceArticles.STORAGE_ARTICLES, 'ean', this.article.Article.ean).then((j: any[]) => {

      if (j.length > 0) {
        this.window.$('#eanArticle').removeClass('is-valid');
        this.window.$('#eanArticle').addClass('is-invalid');
        this.messageErrorEan = "Já existe uma referência do artigo no sistema!"
        this.flag = false;
        return false;
      } else {
        this.window.$('#eanArticle').removeClass('is-invalid');
        this.window.$('#eanArticle').addClass('is-valid');
        this.messageErrorEan = ""
        this.flag = true;
        return true
      }

    })

    return false

  }


}
