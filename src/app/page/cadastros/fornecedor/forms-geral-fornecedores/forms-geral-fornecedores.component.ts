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

  constructor(private auth: AuthService, private store: StorageService, private route: ActivatedRoute) {
    this.listDepartment = new ServiceDepartment(this.store).findAll()
    this.serviceFornecedor = new ServiceFornecedor(this.store);
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

    ServiceUtil.myTagify([address, phoneNumber, emails])

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
      //@ts-ignore
      $("#addressClient").val(this.serviceFornecedor.IObjectClass.address);
      //@ts-ignore
      $("#phoneNumbers").val(this.serviceFornecedor.IObjectClass.phoneNumber);
      //@ts-ignore
      $("#emails").val(this.serviceFornecedor.IObjectClass.emails);
      //@ts-ignore
      $('#typeFornecedor').val(this.serviceFornecedor.IObjectClass.type).select2();
    }
    this.initJQuerysFuncitions()

  }


  save() {

    this.serviceFornecedor.save();
  }


}
