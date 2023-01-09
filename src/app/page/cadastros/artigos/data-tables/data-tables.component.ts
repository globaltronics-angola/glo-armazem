import {Component, OnInit} from '@angular/core';
import {firstValueFrom} from 'rxjs/internal/firstValueFrom';
import {AuthService} from "../../../../shared/auth.service";
import {StorageService} from "../../../../shared/storage.service";
import {concatMap, flatMap, map, mergeMap, switchMap, tap} from "rxjs/operators";
import ServiceArticles from 'src/app/Services/ServiceArticles';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";
import {ServiceEmitter} from "../../../../Services/ServiceEmitter";


@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.css']
})
export class DataTablesComponent implements OnInit {

  list_articles: Observable<any[]>;
  Article: ServiceArticles;
  private window = (<any>window);

  constructor(private auth: AuthService, private store: StorageService, private router: Router) {
    this.Article = new ServiceArticles(this.store);

    this.list_articles = this.Article.findAll();
  }

  ngOnInit(): void {
    (<any>window).InstanceAplication.init()
  }

  edit(attr: any) {
    this.window.$('#categories').val(attr.category_id)
    this.router.navigate(['/cadastros/artigos/geral', {article: attr.id}]);
  }

  deleteArticle(attr: any) {
    console.log(attr)
    let Article = new ServiceArticles(this.store);
    Article.Article = attr

    Article.delete()
  }

  print(){

  }
}
