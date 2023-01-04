import { Component, OnInit } from '@angular/core';
import * as Tagify from "@yaireo/tagify";
import { StorageService } from "../../../../shared/storage.service";
import ServiceDepartment from 'src/app/Services/ServiceDepartment';
import { Observable } from 'rxjs';
import ServiceFornecedor from 'src/app/Services/ServiceFornecedor';

@Component({
  selector: 'app-forms-geral-fornecedores',
  templateUrl: './forms-geral-fornecedores.component.html',
  styles: []
})
export class FormsGeralFornecedoresComponent implements OnInit {


  private window = (<any>window);

  listDepartment: Observable<any>;
  serviceFornecedor: ServiceFornecedor;

  constructor(private store: StorageService) {
    this.listDepartment = new ServiceDepartment(this.store).findAll()
    this.serviceFornecedor = new ServiceFornecedor(this.store);
  }


  initJQuerysFuncitions() {


    const selectDepartment = this.window.$('#departamentosSelectForne');

    selectDepartment.select2().on('change', (e: any) => {
      this.window.instanceSelectedIdDepartments = e.target.value
    })

    const otherInfo = document.querySelector("#otherInfoMultipleItems");

    // @ts-ignore
    new Tagify(otherInfo, {
      originalInputValueFormat: (valuesArr: any[]) => valuesArr.map((item: any) => item.value).join(',')
    });

    // @ts-ignore
    otherInfo.addEventListener('change', (e: any) => {
      this.window.instanceSelectedValueOtherInfo = e.target.value
    })

  }

  ngOnInit(): void {
    this.window.InstanceAplication.init()
    this.initJQuerysFuncitions()

  }


  save() {

    this.serviceFornecedor.IObjectClass.department = JSON.parse(this.window.instanceSelectedIdDepartments.toString());
    this.serviceFornecedor.IObjectClass.others = this.window.instanceSelectedValueOtherInfo?.split(',');

    this.serviceFornecedor.save();
  }


}
