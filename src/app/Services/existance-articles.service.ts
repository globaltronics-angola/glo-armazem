import {Injectable} from '@angular/core';
import {Timestamp} from "@angular/fire/firestore";
import {firstValueFrom} from "rxjs";
import {StorageService} from "../shared/storage.service";
import {AuthService} from "../shared/auth.service";
import ServiceMovimento from "./ServiceMovimento";
import ServiceUtil from "./ServiceUtil";

@Injectable({
  providedIn: 'root'
})
export class ExistanceArticlesService {
  private articleExist: any = {};
  static STORAGE_EXIST_ITEM: string = "global-existence"
  static STORAGE_EXIST_ITEMD: string = "global-existence-devolucao"
  private auth: any;

  constructor(private store: StorageService) {
    this.auth = new ServiceUtil().getSession();
  }

  async existArticle(attr: any) {
    let articleExist: any = {};
    articleExist.id = attr.articleId + JSON.parse(attr.localStorage)
        .id
      + (attr.localAmbry ? JSON.parse(attr.localAmbry).ambry.id + '-' : '')
      + (attr.localShelf ? JSON.parse(attr.localShelf).id + '-' : '')

    articleExist.localStorageId = JSON.parse(attr.localStorage).id;
    articleExist.localStorage = JSON.parse(attr.localStorage).name;
    articleExist.localAmbry = (attr.localAmbry ? JSON.parse(attr.localAmbry).ambry.name : '');
    articleExist.localShelf = (attr.localShelf ? JSON.parse(attr.localShelf).name : '');
    articleExist.quantity = attr.quantity;
    articleExist.article = attr.article;
    articleExist.articleId = JSON.parse(attr.article).id;
    articleExist.created_at = Timestamp.now();
    articleExist.updated_at = Timestamp.now();
    articleExist.deletad_at = "NULL";
    articleExist.order = this.store.getId() + '-' + attr.quantity;
    articleExist.articleName = attr.article ? JSON.parse(attr.article).name : '';


    let usersArry: any = []
    usersArry[this.auth.user.email] = {
      'name': this.auth.user.displayName,
      'photo': this.auth.user.photoURL,
      'iteration': 1
    };
    articleExist.users = usersArry;


    let artExir: any = await firstValueFrom(this.store
      .findById(ExistanceArticlesService.STORAGE_EXIST_ITEM, articleExist.id)).then((e) => {
      return e
    });
    if (artExir?.quantity) {
      articleExist.quantity = articleExist.quantity + artExir.quantity;
      articleExist.users[this.auth.user.email].iteration += 1;
      articleExist.order = this.store.getId() + '-' + articleExist.quantity;
    }
    this.store.createForceMyId(articleExist, ServiceMovimento.STORAGE_EXIST_ITEM).then(() => {
    });

  }

  async existArticleSubtract(attr: any) {
    try {
      let articleExist: any = {};
      articleExist = JSON.parse(attr.existence);
      articleExist.quantity = this.articleExist.quantity - attr.quantity;
      this.store.createForceMyId(articleExist, ExistanceArticlesService.STORAGE_EXIST_ITEM).then(() => {
      });
    } catch (e) {

    }
  }

  async existArticleDevo(attr: any) {
    let articleExist: any = {};
    articleExist.id = attr.articleId + JSON.parse(attr.localStorage)
        .id
      + (attr.localAmbry ? JSON.parse(attr.localAmbry).ambry.id + '-' : '')
      + (attr.localShelf ? JSON.parse(attr.localShelf).id + '-' : '')

    articleExist.localStorageId = JSON.parse(attr.localStorage).id;
    articleExist.localStorage = JSON.parse(attr.localStorage).name;
    articleExist.localAmbry = (attr.localAmbry ? JSON.parse(attr.localAmbry).ambry.name : '');
    articleExist.localShelf = (attr.localShelf ? JSON.parse(attr.localShelf).name : '');
    articleExist.quantity = attr.quantity;
    articleExist.article = attr.article;
    articleExist.articleId = JSON.parse(attr.article).id;
    articleExist.created_at = Timestamp.now();
    articleExist.updated_at = Timestamp.now();
    articleExist.deletad_at = "NULL";
    articleExist.order = this.store.getId() + '-' + attr.quantity;
    articleExist.articleName = attr.article ? JSON.parse(attr.article).name : '';


    let usersArry: any = []
    usersArry[this.auth.email] = {
      'name': this.auth.displayName,
      'photo': this.auth.photoURL,
      'iteration': 1
    };
    articleExist.users = usersArry;


    let artExir: any = await firstValueFrom(this.store
      .findById(ExistanceArticlesService.STORAGE_EXIST_ITEMD, articleExist.id)).then((e) => {
      return e
    });
    if (artExir?.quantity) {
      articleExist.quantity = articleExist.quantity + artExir.quantity;
      articleExist.users[this.auth.email].iteration += 1;
      articleExist.order = this.store.getId() + '-' + articleExist.quantity;
    }

    this.store.createForceMyId(articleExist, ExistanceArticlesService.STORAGE_EXIST_ITEMD).then(() => {
    });

  }
}
