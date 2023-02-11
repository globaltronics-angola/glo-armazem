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

// @ts-ignore
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {FileWriteService} from "../../../shared/file-write.service";


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


  constructor(private store: StorageService, private http: HttpClient, private filewrite: FileWriteService) {

    this.listStorage = new ServiceStorage(this.store).findAll();
    this.listItems = new ServiceMovimentoItems(this.store).findInputMovNull()
  }

  ngOnInit(): void {
    this.initJQuerysFunctions()
  }

  public async dataRow(attr: any, index: number) {
    try {
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
        articleCreated = await serviceArticle.save();
      }


      let movementItem = new ServiceMovimentoItems(this.store);

      movementItem.oItem.article = JSON.stringify(articleCreated);
      movementItem.oItem.articleId = articleCreated?.id;
      movementItem.oItem.articleName = articleCreated?.name;
      movementItem.oItem.quantity = attr.qt;
      movementItem.oItem.localStorage = attr.localStorage;
      movementItem.oItem.localAmbry = attr?.localAmbry;
      movementItem.oItem.localShelf = attr?.localShelf;
      movementItem.oItem.moveType = this.TYPE_MOVEMENT;
      movementItem.oItem.dateOfPurchase = moment().format('DD, MM YYYY');
      movementItem.oItem.index = index

      movementItem.oItem.move = ServiceUtil.VALUE_AT_NULLABLE
      movementItem.oItem.move_id = ServiceUtil.VALUE_AT_NULLABLE

      await movementItem.save();
      this.readJson()
    } catch (e) {
      this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR + 'Tenta novamente')
    }

  }

  saveall() {
    this.arrayData.forEach(async (attr: any, index: number) => {
      try {
        let data: any = {
          'category_id': [attr.category ?? ''],
          'name': attr.name ?? '',
          'model': attr.model ?? '',
          'marquee': attr.marquee ?? '',
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
          articleCreated = await serviceArticle.save();
        }


        let movementItem = new ServiceMovimentoItems(this.store);

        movementItem.oItem.article = JSON.stringify(articleCreated);
        movementItem.oItem.articleId = articleCreated?.id;
        movementItem.oItem.articleName = articleCreated?.name;
        movementItem.oItem.quantity = attr.qt;
        movementItem.oItem.localStorage = attr.localStorage;
        movementItem.oItem.localAmbry = attr?.localAmbry;
        movementItem.oItem.localShelf = attr?.localShelf;
        movementItem.oItem.moveType = this.TYPE_MOVEMENT;
        movementItem.oItem.dateOfPurchase = moment().format('DD, MM YYYY');
        movementItem.oItem.index = index

        movementItem.oItem.move = ServiceUtil.VALUE_AT_NULLABLE
        movementItem.oItem.move_id = ServiceUtil.VALUE_AT_NULLABLE

        await movementItem.save();
        this.readJson()
      } catch (e) {
        this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_ERROR + 'Tenta novamente')
      }
    })
  }

  addRow() {
    this.arrayData.push({
      'category_id': [],
      'name': '',
      'model': '',
      deleted_at: moment().format('DD MM YYYY HH:mm')
    })
    this.initJQuerysFunctions()
  }

  // para rever se é important
  removRow(attr: number) {

    this.arrayData.splice(attr, 1);
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

  downloadXLSX() {

    /* data deve ser um objeto JavaScript ou array e filename é o nome do arquivo a ser baixado */
    const ws = XLSX.utils.json_to_sheet(this.arrayData.map((a: any) => {
      let data: any = {}
      data.Categoria = a.category
      data.Nome = a.name
      data.Modelo = a.model
      data.Quantidade = a.qt
      data.Armazem = a.localStorage ? JSON.parse(a.localStorage).name : '';
      data.Armario = a.localAmbry ? JSON.parse(a.localAmbry).ambry.name : '';
      data.Prateleira = a.localShelf ? JSON.parse(a.localShelf).name : '';
      data.Data = moment().format('DD, MM YYYY');
      return data;
    }));
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Primeira folha");

    XLSX.writeFile(wb, 'Artigos.xlsx');
  }

  onFileChange(ev: any) {
    let workBook: any = null;
    let jsonData: any = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, {type: 'binary'});
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});

      this.arrayData = jsonData['Primeira folha'].map((a: any) => {
        let dataInfo: any = {}
        dataInfo.category = a.Categoria
        dataInfo.name = a.Nome
        dataInfo.model = a.Modelo
        dataInfo.qt = a.Quantidade

        return dataInfo;
      });
      this.initJQuerysFunctions()
    };
    reader.readAsBinaryString(file);
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
