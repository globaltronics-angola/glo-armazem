import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../../shared/storage.service";
import ServiceClients from "../../../../Services/ServiceClients";

@Component({
  selector: 'app-tabelas-clientes',
  templateUrl: './tabelas-clientes.component.html',
  styles: []
})
export class TabelasClientesComponent implements OnInit{


   list_clients: any[] = []

 async ngOnInit(){
   (<any>window).InstanceAplication.init()
    this.list_clients = await ServiceClients.findAll(this.store)
  }

  constructor(private store: StorageService) {
  }

  findAll(){

  }


    deleteClient(id: string){
     this.store.deleted(ServiceClients.STORAGE_CLIENTS, id).then(()=>{
       (<any>window).sentMessageSuccess.init('foi removido com sucesso')
     }, err=>{

     })
    }
}
