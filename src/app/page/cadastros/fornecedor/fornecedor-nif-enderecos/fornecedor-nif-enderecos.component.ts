import {Component, OnInit} from '@angular/core';
import * as Tagify from "@yaireo/tagify";
import * as moment from "moment";
import ServiceCountry from "../../../../Services/ServiceCountry";
import Util from "../../../../../External/Utlil";
import {StorageService} from "../../../../shared/storage.service";
import ServiceFornecedor from "../../../../Services/ServiceFornecedor";

@Component({
  selector: 'app-fornecedor-nif-enderecos',
  templateUrl: './fornecedor-nif-enderecos.component.html',
  styles: []
})
export class FornecedorNifEnderecosComponent implements OnInit {

  lista_paises: any[] = []
  lista_clientes: any[] = []

  addressNifOb: any = {}

  private DELETED_AT_NULL: string = "NULL"
  private STORAGE_CLIENTS_ADDRESS_NIF: string = "global-nif-clients"

  async ngOnInit() {

    this.initJQueryScriptsFunctions()
    this.lista_paises = await ServiceCountry.findAllCountries(this.store)
    this.listFornecedores();
  }

  constructor(private store: StorageService) {
  }

  save() {

    moment().locale('pt-br');

    this.addressNifOb.clientId = (<any>window).instanceSelectedIdcliente;
    this.addressNifOb.country = (<any>window).instanceSelectedIdCountry;


    this.addressNifOb.address = (<any>window).instanceSelectedValueAddress.split(',');

    this.addressNifOb.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.addressNifOb.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.addressNifOb.deleted_at = this.DELETED_AT_NULL;

    this.addressNifOb.email_auth = 'user activities';
    this.addressNifOb.id = this.addressNifOb.nif.toUpperCase();

    this.store.createForceMyId(this.addressNifOb, this.STORAGE_CLIENTS_ADDRESS_NIF).then(
      () => {
        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
      },
      err => {
        alert('Ocorreu um determido erro ')
      }
    );
  }

  initJQueryScriptsFunctions() {

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


  listFornecedores() {


    this.store.findAll(ServiceFornecedor.STORAGE_FORNECEDOR).subscribe((resp) => {
      this.lista_clientes = resp.map((resT: any) => {
        const data = resT.payload.doc.data()
        data.id = resT.payload.doc.id
        return data;
      })
    }, error => {

    })


  }

}
