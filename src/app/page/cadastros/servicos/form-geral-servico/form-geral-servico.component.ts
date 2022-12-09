import {Component, OnInit} from '@angular/core';
import {Products} from "../../../../model/products";
import {AuthService} from "../../../../shared/auth.service";
import {StorageService} from "../../../../shared/storage.service";
import * as moment from "moment/moment";

@Component({
  selector: 'app-form-geral-servico',
  templateUrl: './form-geral-servico.component.html',
  styles: [
  ]
})
export class FormGeralServicoComponent implements OnInit{


  products: Products[] = [];
  services: any = {};
  list_modelos: any = [];
  list_categories: any = [];

  private STORAGE_MODELOS: string = 'global-tipos'
  private STORAGE_PRODUCT: string = 'global-services'
  private STORAGE_CATEGORIES: string = 'global-categorias'

  private DELETED_AT_NULL: string = 'NULL'

  constructor(private auth: AuthService, private store: StorageService) {

  }

  ngOnInit(): void {

    this.findAllModelos();

    this.findAllCategories()

    // calling event change
    this.eventChang();


  }


  save() {
    moment().locale('pt-br');
    this.services.modeloId = (<any>window).instanceSelectedId;
    this.services.categoriesIds = (<any>window).instanceSelectedIdCategories;

    this.services.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.services.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.services.deleted_at = this.DELETED_AT_NULL;
    this.services.email_auth = 'user activities';

    this.services.id = ""

    this.store.create(this.services, this.STORAGE_PRODUCT).then(
      resp => {
        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
        console.log(resp.id)
      },
      err => {
        alert('Ocorreu um determido erro ')
      }
    );
  }


  findAllModelos() {
    this.store.findAll(this.STORAGE_MODELOS).subscribe(
      resp => {
        this.list_modelos = resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      err => {
      }
    )
  }

  findAllCategories() {
    this.store.findAll(this.STORAGE_CATEGORIES).subscribe(
      resp => {
        this.list_categories = resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      err => {
      }
    )
  }


  eventChang() {
    (<any>window).$(function ($: any) {

      $('#modelos').select2();

      $('#categorias').select2();

      $('#modelos').on('change', (event: any) => {
        (<any>window).instanceSelectedId = event.target.value

      })

      $('#categorias').on('change', (event: any) => {
        (<any>window).instanceSelectedIdCategories = $('#categorias').select2("val");
      })

    })


  }


}
