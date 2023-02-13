import {Component, OnInit} from '@angular/core';
import ServiceUtil from "../../../../Services/ServiceUtil";
import {StorageServicePaginateService} from "../../../../shared/storage.service.paginate.service";
import {StorageService} from "../../../../shared/storage.service";
import {AuthService} from "../../../../shared/auth.service";
import ServicePrintMove from "../../../../Services/ServicePrintMove";
import moment from "moment";
import ServiceMovimento from "../../../../Services/ServiceMovimento";
import ServiceExistance from "../../../../Services/ServiceExistance";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {Timestamp} from "@angular/fire/firestore";

@Component({
  selector: 'app-relatorio-inventario-geral',
  templateUrl: './relatorio-inventario-geral.component.html',
  styles: []
})
export class RelatorioInventarioGeralComponent implements OnInit {

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
    this.page = new StorageServicePaginateService(this.store, this.auth, ServiceExistance.STORAGE_STORAGE, 'quantity')
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
    await this.page.findByFieldContext('articleName', this.typingName)
  }


  setSearch(attr: string) {
    this.isSearch = attr;
  }

  public simplesFormat(attr: Date) {

    return Timestamp.fromDate(attr);
  }
}
