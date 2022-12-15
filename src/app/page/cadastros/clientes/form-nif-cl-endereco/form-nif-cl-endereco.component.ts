import {Component, OnInit} from '@angular/core';
import * as Tagify from "@yaireo/tagify";
import {StorageService} from "../../../../shared/storage.service";
import Util from "../../../../../External/Utlil";
import * as moment from "moment/moment";
import ServiceCountry from "../../../../Services/ServiceCountry";

@Component({
  selector: 'app-form-nif-cl-endereco',
  templateUrl: './form-nif-cl-endereco.component.html',
  styles: []
})
export class FormNifClEnderecoComponent implements OnInit {

  lista_paises: any[] = []
  lista_clientes: any[] = []

  addressNifOb: any = {}

  private DELETED_AT_NULL: string = "NULL"
  private STORAGE_CLIENTS_ADDRESS_NIF: string = "global-nif-clients"

  async ngOnInit() {

    this.initJQueryScriptsFunctions()
    this.lista_paises = await ServiceCountry.findAllCountries(this.store)
    this.lista_clientes = await Util.findAllClients(this.store)
    console.log(this.lista_paises);
  }

  constructor(private store: StorageService) {
  }

  save() {

    this.addressNifOb.clientId = (<any>window).instanceSelectedIdcliente;
    this.addressNifOb.country = (<any>window).instanceSelectedIdCountry;


    this.addressNifOb.address = (<any>window).instanceSelectedValueAddress.split(',');

    this.addressNifOb.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.addressNifOb.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.addressNifOb.deleted_at = this.DELETED_AT_NULL;

    this.addressNifOb.email_auth = 'user activities';
    this.addressNifOb.id = this.addressNifOb.nif

    this.store.createdForceGenerateId(this.addressNifOb, this.STORAGE_CLIENTS_ADDRESS_NIF).then(
      () => {
        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
      },
      err => {
        alert('Ocorreu um determido erro ')
      }
    );
  }


  initJQueryScriptsFunctions() {

    (<any>window).InstanceAplication.init()

    (<any>window).$(($: any) => {
      $('#paisesClients').select2().on('change', (e: any) => {
        (<any>window).instanceSelectedIdCountry = e.target.value
      })

      $('#clientesSelecs').select2().on('change', (e: any) => {
        (<any>window).instanceSelectedIdcliente = e.target.value
      })

      const address = document.querySelector("#addressPuts");
      // @ts-ignore
      new Tagify(address, {
        originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(',')
      });

      // @ts-ignore
      address.addEventListener('change', (e: any) => {
        (<any>window).instanceSelectedValueAddress = e.target.value
      })

    })
  }

}
