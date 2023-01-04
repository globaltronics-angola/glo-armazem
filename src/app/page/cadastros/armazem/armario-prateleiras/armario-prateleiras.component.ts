import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../../shared/storage.service";
import * as Tagify from "@yaireo/tagify";
import moment from "moment";
import ServiceStorage from 'src/app/Services/ServiceStorage';
import { Observable } from 'rxjs';
import ServiceArmario from 'src/app/Services/ServiceArmario';
import { ServiceEmitter } from 'src/app/Services/ServiceEmitter';

@Component({
  selector: 'app-armario-prateleiras',
  templateUrl: './armario-prateleiras.component.html',
  styles: []
})
export class ArmarioPrateleirasComponent implements OnInit {

  private window = (<any>window);

  private STORAGE_ARMARIOS: string = "global-armarios"
  private STORAGE_PRATELEIRAS: string = "global-prateleiras"
  private DELETED_AT_NULL: string = "NULL"

  protected armarioO: any = {}
  protected list_unidades: any[] = []
  protected list_armazens: any[] = []
  protected list_type_items: any[] = []

  private prateleiras: any[] = []

  listStorage: Observable<any>;
  serviceArmario: ServiceArmario;


  ngOnInit(): void {

    this.window.InstanceAplication.init()
    this.initJQueryScripts()
  }


  constructor(private store: StorageService) {

    this.listStorage = new ServiceStorage(this.store).findAll()
    this.serviceArmario = new ServiceArmario(this.store);

  }

  async save() {

    this.serviceArmario.IObjectClass.storage = JSON.parse(this.window.instanceSelectedIdStorage.toString());
    this.serviceArmario.IObjectClass.storage_id = JSON.parse(this.window.instanceSelectedIdStorage.toString())?.id;




    this.serviceArmario.IObjectClass.id = (
      JSON.parse(this.window.instanceSelectedIdStorage.toString()).name.replace(' ', '-') + '-'
      + this.serviceArmario.IObjectClass.name.replace(' ', '-')

      ).toUpperCase();

    this.serviceArmario.IObjectClass.shelf = this.window.instanceSelectedIdShelf.split(",")


    ServiceEmitter.get("sendArmarioZone").emit(this.serviceArmario.IObjectClass)

    this.serviceArmario.save();
  }

  initJQueryScripts() {

    const storageSelect = this.window.$('#storageSelect');
    const prateleirasItemsTagify = document.querySelector("#prateleirasItens");

    storageSelect.select2().on('change', (event: any) => {
      this.window.instanceSelectedIdStorage = event.target.value

    })

    // @ts-ignore
    new Tagify(prateleirasItemsTagify, {
      originalInputValueFormat: (valuesArr: any[]) => valuesArr.map(item => item.value).join(',')
    });

    // @ts-ignore
    prateleirasItemsTagify.addEventListener('change', (e: any) => {
      this.window.instanceSelectedIdShelf = e.target.value
    })
  }
}
