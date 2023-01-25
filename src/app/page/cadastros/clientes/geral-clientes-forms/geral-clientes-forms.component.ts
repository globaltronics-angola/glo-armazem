import {Component, OnInit} from '@angular/core';
import * as Tagify from "@yaireo/tagify";
import {Observable} from 'rxjs';
import ServiceClients from 'src/app/Services/ServiceClients';
import ServiceDepartment from 'src/app/Services/ServiceDepartment';
import {StorageService} from "../../../../shared/storage.service";
import ServiceUtil from "../../../../Services/ServiceUtil";
import {ActivatedRoute} from "@angular/router";
import {StorageValidateAnyService} from "../../../../shared/storage.validate.any.service";

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

  private validateAny: StorageValidateAnyService;

  constructor(private store: StorageService, private route: ActivatedRoute) {
    this.client = new ServiceClients(this.store);
    this.listDepartments = new ServiceDepartment(this.store).findAll();
    this.validateAny = new StorageValidateAnyService(this.store, ServiceClients.STORAGE_NAME)
  }

  async save() {
    this.window.$("#addressClient").change()
    this.window.$("#phoneNumbers").change()
    this.window.$("#emails").change()
    try {
      await this.validationName()
      setTimeout(() => {
        this.client.save();
      }, 1000)

    } catch (e) {
      this.window.sentMessageError.init(e)
    }
  }

  ngOnInit() {

    this.window.InstanceAplication.init()


    if (this.route.snapshot.paramMap.get('information')) {
      this.client.IObjectClass = this.ServiceUtil.requestDataInfo(this.route)

      this.window.$("#addressClient").val(this.client.IObjectClass.address);
      this.window.$("#phoneNumbers").val(this.client.IObjectClass.phoneNumber);
      this.window.$("#emails").val(this.client.IObjectClass.emails);
      this.window.$('#typeFornecedor23232').val(this.client.IObjectClass.type).trigger('change');

    }


    this.initFunctions()

  }


  initFunctions() {

    const address = document.querySelector("#addressClient");
    const phoneNumber = document.querySelector("#phoneNumbers");
    const emails = document.querySelector("#emails");

    const type = this.window.$('#typeFornecedor23232');

    type.select2({
      minimumResultsForSearch: -1
    }).on('change', (e: any) => {
      this.client.IObjectClass.type = e.target.value;
    })

    ServiceUtil.myTagify([
      {
        elementAt: phoneNumber,
        pattern: /^\+\([0-9]{3}\) [0-9]{3} [0-9]{3} [0-9]{3}|\+\([0-9]{2}\) [0-9]{3} [0-9]{4}/gm
      },
      {
        elementAt: emails,
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/gm
      },
      {
        elementAt: address
      },
    ], this.client.IObjectClass.updated_mode)


    //address emails
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


  async validationName() {


    await this.validateAny.validateExiste(this.client.IObjectClass.name, 'name',
      false, this.window.$('#nameValid'), this.client.IObjectClass.updated_mode, "Cliente existente no sistema")

    await this.validateAny.validateExiste(this.client.IObjectClass.type, 'type',
      false, this.window.$('#typeFornecedor23232'), this.client.IObjectClass.updated_mode, "", false, true)

    await this.validateAny.validateExiste(this.client.IObjectClass.identityClient, 'identityClient',
      true, this.window.$('#nifValid'), this.client.IObjectClass.updated_mode, "Nif / BI existente no sistema")
  }

}
