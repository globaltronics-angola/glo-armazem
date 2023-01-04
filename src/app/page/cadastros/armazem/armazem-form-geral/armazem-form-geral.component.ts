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

  private STORAGE_PAISES = "global-countries";


  private window = (<any>window);



  constructor(private store: StorageService) {
    this.serviceStorage = new ServiceStorage(this.store);
    this.listCountry = new ServiceCountry(this.store).findAll();

  }



  save() {


    this.serviceStorage.IObjectClass.country = JSON.parse(this.window.instanceSelectedId);
    this.serviceStorage.IObjectClass.address = this.window.instanceSelectedValueEnder.split(',');

    this.serviceStorage.save()

  }


  initJQueryFunctions() {

    const countrySelect = this.window.$('#selectCountry');
    const enddessTagify = document.querySelector("#tagifyAddress");

    countrySelect.select2().on('change', (event: any) => {
      this.window.instanceSelectedId = event.target.value
    })



    // @ts-ignore
    new Tagify(enddessTagify, {
      originalInputValueFormat: (valuesArr: any[]) => valuesArr.map((item:any) => item.value).join(',')
    });

    // @ts-ignore
    enddessTagify.addEventListener('change', (e: any) => {
      this.window.instanceSelectedValueEnder = e.target.value
    })

  }

  ngOnInit(): void {

    (<any>window).InstanceAplication.init()



    this.initJQueryFunctions()


  }



  testing() {
    Paises.forEach((paises: any) => {

      let myPaise: any = {}
      let county: any = PaisesPhone.find((ps: any) => ps.iso == paises.sigla)

      myPaise.id = paises.sigla.toUpperCase()

      myPaise.name = paises.nome_pais
      myPaise.genero = paises.gentilico
      myPaise.iso = paises.sigla
      //myPaise.phone = "";
      //myPaise.phone = county?.code;

      myPaise.externalResquestyCounty = paises
      myPaise.externalResquestyCountyTo = (county ? county : {
        "country": paises.nome_pais,
        "code": "Not found",
        "iso": paises.sigla
      })


      this.store.createdForceGenerateId(myPaise, this.STORAGE_PAISES).then(
        resp => {
          //  (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
          console.log('any success full info')
        },
        err => {
          alert('Ocorreu um determido erro ')
        }
      );

    })
  }

}
