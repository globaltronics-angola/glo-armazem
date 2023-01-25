import {Component, OnInit} from '@angular/core';
import {StorageServicePaginateService} from "../../../../shared/storage.service.paginate.service";
import {StorageService} from "../../../../shared/storage.service";
import {AuthService} from "../../../../shared/auth.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import ServiceClients from "../../../../Services/ServiceClients";
import ServiceExistance from "../../../../Services/ServiceExistance";
import ServiceUtil from "../../../../Services/ServiceUtil";
import moment from "moment";
import {Timestamp, FieldValue} from "@angular/fire/firestore";
import firebase from "firebase/compat";


@Component({
  selector: 'app-tabelas-existencias',
  templateUrl: './tabelas-existencias.component.html',
  styles: []
})
export class TabelasExistenciasComponent implements OnInit {

  private window = (<any>window);
  momentFormat: any;
  listMove: any[] = [];

  pageTotal!: number;
  typingName: string = ""
  isSearch: string = "Nome"
  util: ServiceUtil;
  awaitingProcess: boolean = false;
  public page: StorageServicePaginateService;
  private existance: ServiceExistance;

  constructor(private store: StorageService, private auth: AuthService, private router: Router, private sanitizer: DomSanitizer) {
    this.existance = new ServiceExistance(this.store);
    this.page = new StorageServicePaginateService(this.store, this.auth, ServiceExistance.STORAGE_NAME, 'order')
    this.util = new ServiceUtil();
  }

  async ngOnInit() {
    this.window.InstanceAplication.init()
    this.pageTotal = await this.page.getCounterInfo()
    this.awaitingProcess = true;
  }

  pdfGenerator() {

  }

  deleteMove(mov: any) {

  }

  printMov(mov: any) {

  }

  async find() {
    if (this.isSearch == 'Nome') {
      await this.page.findByFieldContext('name', this.typingName)
    }
    if (this.isSearch == 'Tipo...') {
      if (this.typingName.toLowerCase() == 'colectivo' || this.typingName.toLowerCase() == 'coletivo')
        await this.page.findByFieldContext('type', '2')
      else if (this.typingName.toLowerCase() == 'individual')
        await this.page.findByFieldContext('type', '1')

    }

    if (this.isSearch == 'Nif...') {
      await this.page.findByFieldContext('identityClient', this.typingName)
    }
  }

  setSearch(attr: string) {
    this.isSearch = attr;
  }

  public simplesFormat(attr: Date) {

    return Timestamp.fromDate(attr);
  }
}
