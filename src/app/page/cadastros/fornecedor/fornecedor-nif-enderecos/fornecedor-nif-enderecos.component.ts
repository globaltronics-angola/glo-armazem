import { Component, OnInit } from '@angular/core';
import * as Tagify from "@yaireo/tagify";
import ServiceCountry from "../../../../Services/ServiceCountry";
import { StorageService } from "../../../../shared/storage.service";
import ServiceFornecedor from "../../../../Services/ServiceFornecedor";
import ServiceNifClient from 'src/app/Services/ServiceNifClient';
import { Observable } from 'rxjs';
import { ServiceEmitter } from 'src/app/Services/ServiceEmitter';

@Component({
  selector: 'app-fornecedor-nif-enderecos',
  templateUrl: './fornecedor-nif-enderecos.component.html',
  styles: []
})
export class FornecedorNifEnderecosComponent implements OnInit {

  private window = (<any>window)

  serviceNifClient: ServiceNifClient;
  listFornecedor: Observable<any>;
  listCountry: any[] = [];

  async ngOnInit() {
    this.initJQueryScriptsFunctions()
  }

  constructor(private store: StorageService) {
    this.serviceNifClient = new ServiceNifClient(this.store);
    this.listFornecedor = new ServiceFornecedor(this.store).findAll();
    this.listCountry = new ServiceCountry(this.store).listCountry();
  }

  save() {

    this.serviceNifClient.IObjectClass.id = this.serviceNifClient.IObjectClass.nif.toUpperCase();

    ServiceEmitter.get('sendNewNif').emit(this.serviceNifClient.IObjectClass)
    this.serviceNifClient.save()

  }

  initJQueryScriptsFunctions() {

    const selectCountry = this.window.$('#paisesClients');
    const selectClient = this.window.$('#clientsSelects');
    const address = document.querySelector("#addressPuts");

    selectCountry.select2().on('change', (e: any) => { this.serviceNifClient.IObjectClass.country = e.target.value })
    selectClient.select2().on('change', (e: any) => {
      this.serviceNifClient.IObjectClass.client = e.target.value
      this.serviceNifClient.IObjectClass.client_id = JSON.parse(this.serviceNifClient.IObjectClass.client).id
    })


    // @ts-ignore
    new Tagify(address, {
      originalInputValueFormat: (valuesArr: any) => valuesArr.map((item: any) => item.value).join(',')
    });

    // @ts-ignore
    address.addEventListener('change', (e: any) => {
      this.serviceNifClient.IObjectClass.address = e.target.value?.split(",");
    })
  }

}
