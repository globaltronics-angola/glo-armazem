import { Component, OnInit } from '@angular/core';
import ServiceFornecedor from "../../../../Services/ServiceFornecedor";
import { StorageService } from "../../../../shared/storage.service";

@Component({
  selector: 'app-datatable-fornecedores',
  templateUrl: './datatable-fornecedores.component.html',
  styles: []
})
export class DatatableFornecedoresComponent implements OnInit {

  list_forncedors: any[] = []


  constructor(private store: StorageService) {
  }

  async ngOnInit() {
    (<any>window).InstanceAplication.init()
    await this.listFornecedor()
  }


  async listFornecedor() {
    this.list_forncedors = await ServiceFornecedor.findAll(this.store)
    this.list_forncedors.map(async e => e.departmentObj = await ServiceFornecedor.findDepartment(this.store, e.departmentId))
  }
}
