import { Component, OnInit } from '@angular/core';
import * as Tagify from "@yaireo/tagify";
import { StorageService } from "../../../../shared/storage.service";
import * as moment from "moment/moment";
// @ts-ignore
import Paises from "./paises-gentilicos-google-maps.json"
// @ts-ignore
import PaisesPhone from "./countryPhoneCodes.json"

import ServiceStorage from 'src/app/Services/ServiceStorage';
import ServiceCountry from 'src/app/Services/ServiceCountry';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-armazem-form-geral',
  templateUrl: './armazem-form-geral.component.html',
  styles: []
})
export class ArmazemFormGeralComponent implements OnInit {

  serviceStorage: ServiceStorage;
  listCountry: Observable<any>;


  private window = (<any>window);



  constructor(private store: StorageService) {
    this.serviceStorage = new ServiceStorage(this.store);
    this.listCountry = new ServiceCountry(this.store).findAll();

  }



  save() {

    this.serviceStorage.save()
  }


  initJQueryFunctions() {





    const enddessTagify = document.querySelector("#tagifyAddress");

    // @ts-ignore
    new Tagify(enddessTagify, {
      originalInputValueFormat: (valuesArr: any[]) => valuesArr.map((item: any) => item.value).join(',')
    });

    // @ts-ignore
    enddessTagify.addEventListener('change', (e: any) => {
      this.serviceStorage.IObjectClass.address = e.target.value.split(',');
    })



  }

  ngOnInit(): void {

    (<any>window).InstanceAplication.init()
    this.initJQueryFunctions()

  }

}
