import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../shared/storage.service";
import ServiceUtil from "../../Services/ServiceUtil";

@Component({
  selector: 'app-tabelas-nif-address',
  templateUrl: './tabelas-nif-address.component.html',
  styleUrls: ['./tabelas-nif-address.component.css']
})
export class TabelasNifAddressComponent implements OnInit {

  public list_nif_address: any[] = []

  private STORAGE_NIF_CLIENT: string = "global-nif-clients"
  private STORAGE_PAISES: string = "global-paises"

  constructor(private store: StorageService) {
  }

  async ngOnInit() {
    this.initJQueryScriptsFunctions()
    this.findAllAddressNif()
  }


  findAllAddressNif(idCliente: string = "") {
    this.store.findAll(this.STORAGE_NIF_CLIENT).subscribe(
      (resp: any) => {
        this.list_nif_address = resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;

          if (data.country)
            this.store.findById(this.STORAGE_PAISES, data.country).subscribe(
              dataSet => {
                data.countryObjs = dataSet
              }
            )
          return data;
        }).filter((nifClient: any) => nifClient.clientId == idCliente)
      }
    )
  }

  initJQueryScriptsFunctions() {
    (<any>window).$(($: any) => {


      $('#clientesSelecs').select2().on('change', (e: any) => {

        this.findAllAddressNif(e.target.value)
      })


    })
  }

  deleteNif(id: string) {
    this.store.deleted(ServiceUtil.STORAGE_NIF_CLIENTS, id).then(() => {
      (<any>window).sentMessageSuccess.init('foi removido com sucesso')
    }, err => {

    })
  }


}
