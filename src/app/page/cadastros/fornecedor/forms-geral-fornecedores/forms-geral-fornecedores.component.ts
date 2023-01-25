import {Component, NgZone, OnInit} from '@angular/core';
import * as Tagify from "@yaireo/tagify";
import {StorageService} from "../../../../shared/storage.service";
import ServiceDepartment from 'src/app/Services/ServiceDepartment';
import {Observable} from 'rxjs';
import ServiceFornecedor from 'src/app/Services/ServiceFornecedor';
import ServiceUtil from 'src/app/Services/ServiceUtil';
import {ActivatedRoute, Router} from "@angular/router";
  import {ServiceEncryptDecriptSimples} from "../../../../Services/service-encrypt-decript-simples";
import {AuthService} from "../../../../shared/auth.service";
import {DomSanitizer} from "@angular/platform-browser";
import {StorageValidateAnyService} from "../../../../shared/storage.validate.any.service";
import ServiceClients from "../../../../Services/ServiceClients";

@Component({
  selector: 'app-forms-geral-fornecedores',
  templateUrl: './forms-geral-fornecedores.component.html',
  styles: []
})
export class FormsGeralFornecedoresComponent implements OnInit {


  private window = (<any>window);
  ServiceUtil: any = ServiceUtil;
  listDepartment: Observable<any>;
  serviceFornecedor: ServiceFornecedor;
  private validateAny: StorageValidateAnyService;

  constructor(private auth: AuthService, private store: StorageService, private route: ActivatedRoute) {
    this.listDepartment = new ServiceDepartment(this.store).findAll()
    this.serviceFornecedor = new ServiceFornecedor(this.store);
    this.validateAny = new StorageValidateAnyService(this.store, ServiceClients.STORAGE_NAME)
  }


  initJQuerysFuncitions() {

    const address = document.querySelector("#addressClient");
    const phoneNumber = document.querySelector("#phoneNumbers");
    const emails = document.querySelector("#emails");
    //@ts-ignore
    const type = $('#typeFornecedor');

    //@ts-ignore
    type.select2({
      minimumResultsForSearch: -1
    }).on('change', (e: any) => {
      this.serviceFornecedor.IObjectClass.type = e.target.value;
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
    ], this.serviceFornecedor.IObjectClass.updated_mode)

    // @ts-ignore
    address.addEventListener('change', (e: any) => {
      this.serviceFornecedor.IObjectClass.address = e.target.value
    })

    // @ts-ignore
    phoneNumber.addEventListener('change', (e: any) => {
      this.serviceFornecedor.IObjectClass.phoneNumber = e.target.value
    })

    // @ts-ignore
    emails.addEventListener('change', (e: any) => {
      this.serviceFornecedor.IObjectClass.emails = e.target.value.split(',')
    })

  }

  ngOnInit(): void {
    this.window.InstanceAplication.init()

    if(this.route.snapshot.paramMap.get('information')){
      this.serviceFornecedor.IObjectClass = this.ServiceUtil.requestDataInfo(this.route)
      console.log(this.serviceFornecedor.IObjectClass)
      this.window.$("#addressClient").val(this.serviceFornecedor.IObjectClass.address);
      this.window.$("#phoneNumbers").val(this.serviceFornecedor.IObjectClass.phoneNumber);
      this.window.$("#emails").val(this.serviceFornecedor.IObjectClass.emails);
      this.window.$('#typeFornecedor').val(this.serviceFornecedor.IObjectClass.type).select2();
    }
    this.initJQuerysFuncitions()
  }


  async save() {
    this.window.$("#addressClient").change()
    this.window.$("#phoneNumbers").change()
    this.window.$("#emails").change()

    try{
      await this.validationName()
      setTimeout(()=>{
        this.serviceFornecedor.save();
      },1000)


    }catch (e) {
      this.window.sentMessageError.init(e)
    }
  }

  async validationName() {


    await this.validateAny.validateExiste(this.serviceFornecedor.IObjectClass.name, 'name',
      false, this.window.$('#nameValid'), this.serviceFornecedor.IObjectClass.updated_mode, "Fornecedor existente no sistema")

    await this.validateAny.validateExiste(this.serviceFornecedor.IObjectClass.type, 'type',
      false, this.window.$('#typeFornecedor'), this.serviceFornecedor.IObjectClass.updated_mode, "", false, true)

    await this.validateAny.validateExiste(this.serviceFornecedor.IObjectClass.identityClient, 'identityClient',
      true, this.window.$('#nifValid'), this.serviceFornecedor.IObjectClass.updated_mode, "Nif / BI existente no sistema")
  }


}
