import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/auth.service";
import {StorageService} from "../../../../shared/storage.service";
import {Products} from "../../../../model/products";


@Component({
  selector: 'app-form-geral',
  templateUrl: './form-geral.component.html',
  styleUrls: ['./form-geral.component.css']
})

export class FormGeralComponent implements OnInit {

  products: Products[] = [];
  productObj: any = {};
  list_modelos: any = [];

  STORAGE_MODELOS: string = 'global-modelos'
  STORAGE_PRODUCT: string = 'global-produtos'

  constructor(private auth: AuthService, private store: StorageService) {

  }

  ngOnInit(): void {

    (<any>window).instanceSelectedId = "";
    (<any>window).instanceSelectedName = "";
    this.findAllModelos();

    // calling event change
    this.eventChang();
  }

  save() {

    this.productObj.modeloId = (<any>window).instanceSelectedId;
    // this.productObj.modelo.id = (<any>window).instanceSelectedId
    // this.productObj.modelo.name = (<any>window).instanceSelectedName
    this.productObj.id = ""
    this.store.create(this.productObj, this.STORAGE_PRODUCT).then(
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

  eventChang() {
    (<any>window).$(function ($: any) {

      $('#modelos').select2();

      $('#categorias').select2();

      $('#modelos').on('change', (event: any) => {
        (<any>window).instanceSelectedId = event.target.value

      })



    })


  }
}
