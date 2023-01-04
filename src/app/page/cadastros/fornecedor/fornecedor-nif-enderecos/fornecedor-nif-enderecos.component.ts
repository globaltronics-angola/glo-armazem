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
  listCountry: Observable<any>;

  async ngOnInit() {
    this.initJQueryScriptsFunctions()
  }

  constructor(private store: StorageService) {
    this.serviceNifClient = new ServiceNifClient(this.store);
    this.listFornecedor = new ServiceFornecedor(this.store).findAll();
    this.listCountry = new ServiceCountry(this.store).findAll();
  }

  save() {

    this.serviceNifClient.IObjectClass.client = JSON.parse(this.window.instanceSelectedIdClient);
    this.serviceNifClient.IObjectClass.country = JSON.parse(this.window.instanceSelectedIdCountry);

    this.serviceNifClient.IObjectClass.id = this.serviceNifClient.IObjectClass.nif.toUpperCase();

    this.serviceNifClient.IObjectClass.address = this.window.instanceSelectedValueAddress.split(',');
    ServiceEmitter.get('sendNewNif').emit(this.serviceNifClient.IObjectClass)
    this.serviceNifClient.save()

  }

  initJQueryScriptsFunctions() {

    const selectCountry = this.window.$('#paisesClients');
    const selectClient = this.window.$('#clientsSelects');
    const address = document.querySelector("#addressPuts");

    selectCountry.select2().on('change', (e: any) => { this.window.instanceSelectedIdCountry = e.target.value })
    selectClient.select2().on('change', (e: any) => { this.window.instanceSelectedIdClient = e.target.value })


    // @ts-ignore
    new Tagify(address, {
      originalInputValueFormat: (valuesArr:any) => valuesArr.map((item:any) => item.value).join(',')
    });

    // @ts-ignore
    address.addEventListener('change', (e: any) => {
      this.window.instanceSelectedValueAddress = e.target.value
    })
  }

}
