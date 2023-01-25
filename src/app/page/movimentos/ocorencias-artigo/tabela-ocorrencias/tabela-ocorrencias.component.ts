import {Component, OnInit} from '@angular/core';
import ServiceUtil from "../../../../Services/ServiceUtil";
import {StorageServicePaginateService} from "../../../../shared/storage.service.paginate.service";
import ServiceExistance from "../../../../Services/ServiceExistance";
import {StorageService} from "../../../../shared/storage.service";
import {AuthService} from "../../../../shared/auth.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";

@Component({
  selector: 'app-tabela-ocorrencias',
  templateUrl: './tabela-ocorrencias.component.html',
  styles: []
})
export class TabelaOcorrenciasComponent implements OnInit {

  private window = (<any>window);

  pageTotal!: number;
  typingName: string = ""
  isSearch: string = "Nome"
  util: ServiceUtil;
  awaitingProcess: boolean = false;
  public page: StorageServicePaginateService;
  private existance: ServiceMovimentoItems;

  constructor(private store: StorageService, private auth: AuthService, private router: Router, private sanitizer: DomSanitizer) {
    this.existance = new ServiceMovimentoItems(this.store);
    this.page = new StorageServicePaginateService(this.store, this.auth, ServiceMovimentoItems.STORAGE_NAME ,'id')
    this.util = new ServiceUtil();
  }

  async ngOnInit() {
    this.window.InstanceAplication.init()
    this.pageTotal = await this.page.getCounterInfo()
    this.awaitingProcess = true;
  }

  printMov(mov: any) {

  }

  pdfGenerator() {

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
}
