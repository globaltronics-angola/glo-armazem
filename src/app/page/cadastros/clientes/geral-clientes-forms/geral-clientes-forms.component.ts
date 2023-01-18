import {Component, OnInit} from '@angular/core';
import * as Tagify from "@yaireo/tagify";
import {Observable} from 'rxjs';
import ServiceClients from 'src/app/Services/ServiceClients';
import ServiceDepartment from 'src/app/Services/ServiceDepartment';
import {StorageService} from "../../../../shared/storage.service";
import ServiceUtil from "../../../../Services/ServiceUtil";
import {ActivatedRoute} from "@angular/router";

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
  ServiceUtil: any = ServiceUtil;

  save() {

    this.client.save();
  }

  ngOnInit() {

    this.window.InstanceAplication.init()


    if (this.route.snapshot.paramMap.get('information')) {
      this.client.IObjectClass = this.ServiceUtil.requestDataInfo(this.route)
      console.log(this.client.IObjectClass)
      //@ts-ignore
      $("#addressClient").val(this.client.IObjectClass.address);
      //@ts-ignore
      $("#phoneNumbers").val(this.client.IObjectClass.phoneNumber);
      //@ts-ignore
      $("#emails").val(this.client.IObjectClass.emails);
      //@ts-ignore
      $('#typefornecedor').val(this.client.IObjectClass.type).select2();
    }


    this.initFunctions()

  }

  constructor(private store: StorageService, private route: ActivatedRoute) {
    this.client = new ServiceClients(this.store);
    this.listDepartments = new ServiceDepartment(this.store).findAll();
  }


  initFunctions() {

    const address = document.querySelector("#addressClient");
    const phoneNumber = document.querySelector("#phoneNumbers");
    const emails = document.querySelector("#emails");
    //@ts-ignore
    const type = $('#typeFornecedor');

    //@ts-ignore
    type.select2({
      minimumResultsForSearch: -1
    }).on('change', (e: any) => {
      this.client.IObjectClass.type = e.target.value;
    })

    ServiceUtil.myTagify([address, phoneNumber, emails])

    // @ts-ignore
    address.addEventListener('change', (e: any) => {
      this.client.IObjectClass.address = e.target.value.split(',')
    })

    // @ts-ignore
    phoneNumber.addEventListener('change', (e: any) => {
      this.client.IObjectClass.phoneNumber = e.target.value.split(',')
    })

    // @ts-ignore
    emails.addEventListener('change', (e: any) => {
      this.client.IObjectClass.emails = e.target.value.split(',')
    })
  }


}
