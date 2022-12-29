import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../../shared/storage.service";
import ServiceClients from "../../../../Services/ServiceClients";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabelas-clientes',
  templateUrl: './tabelas-clientes.component.html',
  styles: []
})
export class TabelasClientesComponent implements OnInit {


  private window = (<any>window);
  listClients: Observable<any>;
  client: ServiceClients;

  async ngOnInit() {
    this.window.InstanceAplication.init()


  }

  constructor(private store: StorageService) {
    this.client = new ServiceClients(this.store);
    this.listClients = this.client.findAll();
  }

  delete(attr: any) {
    this.client.IObjectClass = attr;
    this.client.delete()
  }



}
