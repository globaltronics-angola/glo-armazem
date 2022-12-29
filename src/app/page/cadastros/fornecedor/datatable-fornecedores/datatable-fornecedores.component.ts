import { Component, OnInit } from '@angular/core';
import ServiceFornecedor from "../../../../Services/ServiceFornecedor";
import { StorageService } from "../../../../shared/storage.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datatable-fornecedores',
  templateUrl: './datatable-fornecedores.component.html',
  styles: []
})
export class DatatableFornecedoresComponent implements OnInit {

  list_forncedors: any[] = []
  private window = (<any>window);
  listForncedores: Observable<any>;

  constructor(private store: StorageService) {
    this.listForncedores = new ServiceFornecedor(this.store).findAll();

  }


  async ngOnInit() {
    this.window.InstanceAplication.init()
    await this.listFornecedor()
  }


  async listFornecedor() {

  }
}
