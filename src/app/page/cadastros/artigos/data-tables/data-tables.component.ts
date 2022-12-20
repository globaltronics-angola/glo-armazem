import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { AuthService } from "../../../../shared/auth.service";
import { StorageService } from "../../../../shared/storage.service";
import { concatMap, flatMap, map, mergeMap, switchMap, tap } from "rxjs/operators";
import ServiceArticles from 'src/app/Services/ServiceArticles';


@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.css']
})
export class DataTablesComponent implements OnInit {

  list_articles: Promise<any> | undefined;
  Article: ServiceArticles;

  constructor(private auth: AuthService,
    private store: StorageService) {
      this.Article = new ServiceArticles(this.store);
      this.list_articles =  this.Article.findAll();
  }

  ngOnInit(): void {
    (<any>window).InstanceAplication.init()
  }
}
