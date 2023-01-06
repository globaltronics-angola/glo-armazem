import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from "../../shared/storage.service";
import ServiceNifClient from 'src/app/Services/ServiceNifClient';
import { ServiceEmitter } from 'src/app/Services/ServiceEmitter';
import { firstValueFrom, Subscription } from 'rxjs';
import ServiceUtil from 'src/app/Services/ServiceUtil';

@Component({
  selector: 'app-tabelas-nif-address',
  templateUrl: './tabelas-nif-address.component.html',
  styleUrls: []
})
export class TabelasNifAddressComponent implements OnInit, OnDestroy {


  listNifAddress: any[] = [];
  private window = (<any>window)
  clientNif: ServiceNifClient;
  snKnow: Subscription | undefined;
  instanceRequest: any;
  util: ServiceUtil;


  constructor(private store: StorageService) {
    this.clientNif = new ServiceNifClient(this.store);
    this.snKnow = ServiceEmitter.get("sendNewNif")
      .subscribe(async () => this.listNifAddress
        = await this.clientNif.findByArticleId(this.instanceRequest));

    this.findAll();

    this.util = new ServiceUtil();

  }

  ngOnDestroy(): void { this.snKnow?.unsubscribe() }

  async ngOnInit() { this.initJQueryScriptsFunctions() }

  initJQueryScriptsFunctions() {
    const selectClient = this.window.$('#clientsSelects');
    selectClient.select2().on('change', async (e: any) => {
      this.listNifAddress = await this.clientNif.findByArticleId(e.target.value);
      this.instanceRequest = e.target.value
    })
  }

  async findAll() {
    this.listNifAddress = await firstValueFrom(new ServiceNifClient(this.store).findAll());
  }

  async delete(attr: any) {
    this.clientNif.IObjectClass = attr;
    this.clientNif.delete()
    this.listNifAddress = await this.clientNif.findByArticleId(this.instanceRequest);
  }





}
