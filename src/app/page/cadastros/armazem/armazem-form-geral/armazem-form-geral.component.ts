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
import {StorageValidateAnyService} from "../../../../shared/storage.validate.any.service";
import {ActivatedRoute} from "@angular/router";


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
  private validateAny: StorageValidateAnyService;
  private currentIdAmbry: number = -1;
  private prateleira: any;

  constructor(private store: StorageService, private route: ActivatedRoute) {
    this.serviceStorage = new ServiceStorage(this.store);
    this.validateAny = new StorageValidateAnyService(this.store, ServiceStorage.STORAGE_NAME)
  }


  async save() {

    try {
      await this.validationViews();

      setTimeout(() => {
        this.serviceStorage.save()
      }, 1000)
    } catch (e) {
      this.window.sentMessageError.init(e)
    }
  }


  initJQueryFunctions() {

    const address = document.querySelector("#address");
    const shelf = document.querySelector("#shelf");

    ServiceUtil.myTagify([
      {elementAt: address},
      {elementAt: shelf}])

    // @ts-ignore


    // @ts-ignore
    address.addEventListener('change', (e: any) => {
      this.serviceStorage.IObjectClass.address = e.target.value.split(',');
    })

    this.prateleira = shelf;
    // @ts-ignore
    shelf.addEventListener('change', (e: any) => {
      this.shelf = e.target.value.split(',');
    })

  }

  ngOnInit(): void {
    //const dataPra = localStorage.getItem('_listPrate')
    //this.listArmariaShelf = JSON.parse(""+dataPra);

    this.window.InstanceAplication.init()

    if (this.route.snapshot.paramMap.get('information')) {
      this.serviceStorage.IObjectClass = this.util.requestDataInfo(this.route)
      console.log(this.serviceStorage.IObjectClass)
      this.window.$("#address").val(this.serviceStorage.IObjectClass.address);

      this.listArmariaShelf = this.serviceStorage.IObjectClass.ambry
      /*this.window.$("#phoneNumbers").val(this.serviceStorage.IObjectClass.phoneNumber);
     this.window.$("#emails").val(this.serviceStorage.IObjectClass.emails);
     this.window.$('#typeFornecedor').val(this.serviceStorage.IObjectClass.type).select2();*/
    }
    this.initJQueryFunctions()
  }

  async add() {

    await this.window.$("#shelf").change()

    await setTimeout(async () => {

      try {
        if (this.currentIdAmbry == -1) {
          await this.validateList();
        }

        await this.validateAdd()

        if (this.currentIdAmbry == -1) {
          let shelf = {
            'ambry': {'name': this.ambry, 'id': this.store.getId().toUpperCase()},
            'shelf': this.shelf.map(a => {
              return {
                'id': this.store.getId().toUpperCase(),
                'name': a
              }
            })
          }
          this.listArmariaShelf.push(shelf)
        } else {
          let temp = this.listArmariaShelf[this.currentIdAmbry]
          temp.ambry.name = this.ambry;

          this.shelf.forEach((ad: string, index: number) => {
            temp.shelf[index].name = ad
          })

          console.log(temp.shelf)

          this.listArmariaShelf[this.currentIdAmbry] = temp
          this.currentIdAmbry = -1;
        }

        this.serviceStorage.IObjectClass.ambry = this.listArmariaShelf;
        this.window.sentMessageSuccess.init(ServiceUtil.MESSAGE_SUCCESS)
      } catch (e) {
        this.window.sentMessageError.init(e)
      }
    }, 2000)

  }

  async validateList() {
    await this.listArmariaShelf.forEach(e => {
      if (e.ambry.name == this.ambry) {
        this.window.$('#ambryArmazem').addClass('is-invalid')
        throw "Já existem esse armário neste armazém"
      }

      this.window.$('#ambryArmazem').addClass('is-valid')
    })
  }

  deleteList(attr: any) {
    let i = this.listArmariaShelf.indexOf(attr)
    // delete this.listArmariaShelf[i]
    this.listArmariaShelf.splice(i, 1);
    console.log(this.listArmariaShelf);
    this.serviceStorage.IObjectClass.ambry = this.listArmariaShelf;
    sessionStorage.setItem('_listPrate', JSON.stringify(this.listArmariaShelf))
  }

  editList(a: any) {
    let i = this.listArmariaShelf.indexOf(a)
    this.currentIdAmbry = i;
    this.ambry = a.ambry?.name
    this.window.$("#shelf").change()
    setTimeout(() => {
      this.window.$('#shelf').val(a.shelf.map((e: any) => {
        return e.name
      }))
      this.window.$("#shelf").change()
    }, 1000)

    console.log(a, i)
  }

  async validationViews() {
    await this.validateAny.validateExiste(this.serviceStorage.IObjectClass.name, 'name',
      false, this.window.$('#nameArmazem'), this.serviceStorage.IObjectClass.updated_mode, "Já existem um armazém no sistema com o mesmo nome")

    const addressInfo: string = await (this.shelf.length > 0 ? 'Active' : "");
    await this.validateAny.validateExiste(addressInfo, 'address',
      false, this.window.$('#address'), this.serviceStorage.IObjectClass.updated_mode, "", false, false, "addressLocal")


  }

  // Já existem um armazém no sistema com o mesmo nome
  async validateAdd() {

    await this.validateAny.validateExiste(this.window.$('#ambryArmazem').val(), 'ambry',
      false, this.window.$('#ambryArmazem'), this.serviceStorage.IObjectClass.updated_mode,
      "", false, false)

    const info: string = await (this.shelf.length > 0 ? 'Active' : "");

    await this.validateAny.validateExiste(info, 'shelf',
      false, this.window.$('#shelf'), this.serviceStorage.IObjectClass.updated_mode,
      "", false, false, 'prateleiras')


  }
}
