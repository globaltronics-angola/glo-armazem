import { Component, OnInit } from '@angular/core';
import * as Tagify from "@yaireo/tagify";
import { Observable } from 'rxjs';
import ServiceClients from 'src/app/Services/ServiceClients';
import ServiceDepartment from 'src/app/Services/ServiceDepartment';
import { StorageService } from "../../../../shared/storage.service";

@Component({
  selector: 'app-geral-clientes-forms',
  templateUrl: './geral-clientes-forms.component.html',
  styles: []
})
export class GeralClientesFormsComponent implements OnInit {

  private window = (<any>window);
  private jquery = (<any>window).$;
  client: ServiceClients;
  listDepartments: Observable<any>;


  save() {

    this.client.IObjectClass.department = JSON.parse(this.window.instanceSelectedIdDepartments)
    this.client.IObjectClass.others = this.window.instanceSelectedValueOtherInfo.split(',')
    this.client.save();
  }

  ngOnInit() {

    this.window.InstanceAplication.init()

    this.initFunctions()

  }

  constructor(private store: StorageService) {
    this.client = new ServiceClients(this.store);
    this.listDepartments = new ServiceDepartment(this.store).findAll();
  }


  initFunctions() {

    const selectDepartment = this.jquery('#departmentsSelect')
    selectDepartment.select2().on('change', (e: any) => {
      this.window.instanceSelectedIdDepartments = e.target.value
    })

    const otherInfo = document.querySelector("#otherInfoMultipleItems");

    // @ts-ignore
    new Tagify(otherInfo, {
      originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(',')
    });

    // @ts-ignore
    otherInfo.addEventListener('change', (e: any) => {
      this.window.instanceSelectedValueOtherInfo = e.target.value
    })
  }



}
