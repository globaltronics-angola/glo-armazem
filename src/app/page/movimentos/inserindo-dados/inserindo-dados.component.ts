import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import ServiceStorage from 'src/app/Services/ServiceStorage';
import {StorageService} from 'src/app/shared/storage.service';
import {HttpClient} from '@angular/common/http';
//@ts-ignore
import Dados from "./TDArtigos.json"
import ServiceArticles from "../../../Services/ServiceArticles";
import ServiceMovimentoItems from "../../../Services/ServiceMovimentoItems";
import _ from "lodash";
import ServiceUtil from "../../../Services/ServiceUtil";
import moment from "moment";


@Component({
  selector: 'app-inserindo-dados',
  templateUrl: './inserindo-dados.component.html',
  styleUrls: ['./inserindo-dados.component.css']
})
export class InserindoDadosComponent implements OnInit, PipeTransform {

  public arrayData: any[] = [];

  listStorage: Observable<any>;
  listArmarios: any = [];
  listShelf: any = [];
  TYPE_MOVEMENT: string = "INPUT"

  public window = (<any>window);
  private selectedFile: any;
  private listItems: any[];


  constructor(private store: StorageService, private http: HttpClient) {

    this.listStorage = new ServiceStorage(this.store).findAll();
    this.listItems = new ServiceMovimentoItems(this.store).findInputMovNull()
  }

  ngOnInit(): void {
    this.initJQuerysFunctions()
  }

  public async dataRow(attr: any, index: number) {


    let data: any = {
      'category_id': [attr.category],
      'name': attr.name,
      'model': attr.model,
      deleted_at: "NULL"
    }

    const key = attr.category.toUpperCase().replace(" ", "-").replace(" ", "-").replace(" ", "-")
      + attr.name.toUpperCase().replace(" ", "-").replace(" ", "-").replace(" ", "-")
      + attr.model.toUpperCase().replace(" ", "-").replace(" ", "-").replace(" ", "-");

    data.key = this.transform(key);

    data.id = this.store.getId();
    let articleCreated: any = data;
    let articleArr: any[] = await this.store.findByOther(ServiceArticles.STORAGE_ARTICLES, 'key', data.key);
    if (articleArr.length > 0) {
      articleCreated = articleArr[0]
    }

    if (!articleCreated.created_at) {
      let serviceArticle = new ServiceArticles(this.store)
      serviceArticle.Article = data;
      await serviceArticle.save();
    }


    let movementItem = new ServiceMovimentoItems(this.store);

    movementItem.oItem.article = JSON.stringify(articleCreated);
    movementItem.oItem.articleId = articleCreated?.id;
    movementItem.oItem.articleName = articleCreated?.name;
    movementItem.oItem.quantity = attr.qt;
    movementItem.oItem.localStorage = attr.localStorage;
    movementItem.oItem.localAmbry = attr.localAmbry;
    movementItem.oItem.localShelf = attr.localShelf;
    movementItem.oItem.moveType = this.TYPE_MOVEMENT;
    movementItem.oItem.dateOfPurchase = moment().format('DD, MM YYYY');
    movementItem.oItem.index = index

    movementItem.oItem.move = ServiceUtil.VALUE_AT_NULLABLE
    movementItem.oItem.move_id = ServiceUtil.VALUE_AT_NULLABLE

    await movementItem.save();
    this.arrayData.splice(index, 1);


  }


  initJQuerysFunctions() {
    //this.window.$('input[name="selectedArmazem2022"]')

    this.arrayData.forEach((e, index) => {

      this.updateFile(index);

      this.window.$(document).ready(($: any) => {


        $('#select' + index).select2({minimumResultsForSearch: -1}).on('change', async (e: any) => {
          if (!e.target.value)
            return;
          this.arrayData[index]['indexOf'] = index
          this.arrayData[index]['localStorage'] = e.target.value
          this.listArmarios[index] = JSON.parse(e.target.value).ambry
        });

        $('#armario' + index).select2({minimumResultsForSearch: -1}).on('change', async (e: any) => {
          if (!e.target.value)
            return;

          this.arrayData[index]['localAmbry'] = e.target.value
          this.listShelf[index] = JSON.parse(e.target.value).shelf;
        })

        $('#prate' + index).select2({minimumResultsForSearch: -1}).on('change', async (e: any) => {
          if (!e.target.value)
            return;

          this.arrayData[index]['localShelf'] = e.target.value
        })
      });

    })
  }

  updateFile(index: number) {
    this.window.$(document).ready(($: any) => {


      setTimeout(() => {
        if (this.arrayData[index].localStorage) {
          $('#select' + index).select2({minimumResultsForSearch: -1}).val(this.arrayData[index].localStorage).trigger('change');
        }
      }, 2000)


    });
  }


  event() {

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.readJson();
  }

  private readJson() {
    const reader = new FileReader();
    reader.onload = async () => {
      this.arrayData = await JSON.parse(reader.result as string)
      if (this.listItems.length > 0) {
        this.listItems.forEach((af: any) => {
          this.arrayData.splice(af.index, 1);
        })
      }
      await this.initJQuerysFunctions()
    };
    reader.readAsText(this.selectedFile);

  }

  otherContext() {

  }


  downloadJson() {
    const json = JSON.stringify(this.arrayData, null, 2);
    const blob = new Blob([json], {type: 'application/json'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'LançamentoDados.json');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  transform(value: any): any {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
