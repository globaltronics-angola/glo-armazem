import {Component, OnInit} from '@angular/core';
import * as Tagify from "@yaireo/tagify";
import {StorageService} from "../../../../shared/storage.service";
import * as moment from "moment/moment";
// @ts-ignore
import Paises from "./paises-gentilicos-google-maps.json"
// @ts-ignore
import PaisesPhone from "./countryPhoneCodes.json"

import ServiceStorage from 'src/app/Services/ServiceStorage';
import ServiceCountry from 'src/app/Services/ServiceCountry';
import {Observable} from 'rxjs';
import ServiceUtil from "../../../../Services/ServiceUtil";


@Component({
  selector: 'app-armazem-form-geral',
  templateUrl: './armazem-form-geral.component.html',
  styles: []
})
export class ArmazemFormGeralComponent implements OnInit {

  serviceStorage: ServiceStorage;
  listArmariaShelf: any[] = []
  shelf: any[] = []
  ambry: string = ""
  private window = (<any>window);
  util: any = ServiceUtil


  constructor(private store: StorageService) {
    this.serviceStorage = new ServiceStorage(this.store);
  }


  save() {

    this.serviceStorage.save()
  }


  initJQueryFunctions() {

    const address = document.querySelector("#address");
    const shelf = document.querySelector("#shelf");

    ServiceUtil.myTagify([address, shelf])

    // @ts-ignore
    address.addEventListener('change', (e: any) => {
      this.serviceStorage.IObjectClass.address = e.target.value.split(',');
    })

    // @ts-ignore
    shelf.addEventListener('change', (e: any) => {
      this.shelf = e.target.value.split(',');
    })

  }

  ngOnInit(): void {
    this.window.InstanceAplication.init()
    this.initJQueryFunctions()
  }

  add() {

    let shelf = {
      'ambry': this.ambry,
      'shelf': this.shelf
    }

    this.listArmariaShelf.push(shelf)
    console.log(this.listArmariaShelf)
    this.serviceStorage.IObjectClass.ambry = this.listArmariaShelf;
  }

  deleteList(attr: any) {
    let i = this.listArmariaShelf.indexOf(attr)
    // delete this.listArmariaShelf[i]
    this.listArmariaShelf.splice(i, 1);
    console.log(this.listArmariaShelf);
    this.serviceStorage.IObjectClass.ambry = this.listArmariaShelf;
  }

}
