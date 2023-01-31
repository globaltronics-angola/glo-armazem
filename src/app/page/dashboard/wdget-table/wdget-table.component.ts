import {Component, OnInit} from '@angular/core';
import ServiceUtil from "../../../Services/ServiceUtil";
import {StorageServicePaginateService} from "../../../shared/storage.service.paginate.service";
import ServiceExistance from "../../../Services/ServiceExistance";
import {StorageService} from "../../../shared/storage.service";
import {AuthService} from "../../../shared/auth.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-wdget-table',
  templateUrl: './wdget-table.component.html',
  styles: [
  ]
})
export class WdgetTableComponent implements OnInit {

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
    this.page = new StorageServicePaginateService(this.store, this.auth, ServiceExistance.STORAGE_STORAGE, 'order')
    this.page.offset = 5;
    this.util = new ServiceUtil();
  }

  async ngOnInit() {
    this.window.InstanceAplication.init()
    this.pageTotal = await this.page.getCounterInfo()
    this.awaitingProcess = true;
  }

}
