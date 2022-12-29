import { Component, OnInit } from '@angular/core';
import * as Tagify from "@yaireo/tagify";
import { StorageService } from "../../../../shared/storage.service";
import ServiceCountry from "../../../../Services/ServiceCountry";
import ServiceClients from 'src/app/Services/ServiceClients';
import { Observable } from 'rxjs';
import ServiceNifClient from 'src/app/Services/ServiceNifClient';
import { ServiceEmitter } from 'src/app/Services/ServiceEmitter';

@Component({
  selector: 'app-form-nif-cl-endereco',
  templateUrl: './form-nif-cl-endereco.component.html',
  styles: []
})
export class FormNifClEnderecoComponent implements OnInit {



  listClient: Observable<any>;
  listCountry: Observable<any>;
  nif: ServiceNifClient;

  private window = (<any>window);


  async ngOnInit() {
    this.window.InstanceAplication.init();
    this.initJQueryScriptsFunctions()

  }

  constructor(private store: StorageService) {
    this.nif = new ServiceNifClient(this.store);
    this.listClient = new ServiceClients(this.store).findAll();
    this.listCountry = new ServiceCountry(this.store).findAll();
  }

  save() {


    this.nif.IObjectClass.client = JSON.parse(this.window.instanceSelectedIdClient.toString());
    this.nif.IObjectClass.country = JSON.parse(this.window.instanceSelectedIdCountry.toString());
    this.nif.IObjectClass.address = this.window.instanceSelectedValueAddress.split(',');

    this.nif.IObjectClass.id = this.nif.IObjectClass.nif.toUpperCase();
    ServiceEmitter.get('sendNewNif').emit(this.nif.IObjectClass)
    this.nif.save()



  }


  initJQueryScriptsFunctions() {

    const clientsSelects = this.window.$('#clientsSelects')
    const countryClients = this.window.$('#countryClients')
    const address = document.querySelector("#addressPuts");

    clientsSelects.select2().on('change', (e: any) => {
      this.window.instanceSelectedIdClient = e.target.value
    })

    countryClients.select2().on('change', (e: any) => {
      this.window.instanceSelectedIdCountry = e.target.value
    })


    // @ts-ignore
    new Tagify(address, {
      originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(',')
    });

    // @ts-ignore
    address.addEventListener('change', (e: any) => {
      this.window.instanceSelectedValueAddress = e.target.value
    })


  }



}
