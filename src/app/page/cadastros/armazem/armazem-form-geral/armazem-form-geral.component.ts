import {Component, OnInit} from '@angular/core';
import * as Tagify from "@yaireo/tagify";
import {StorageService} from "../../../../shared/storage.service";
import * as moment from "moment/moment";
// @ts-ignore
import Paises from "./paises-gentilicos-google-maps.json"
// @ts-ignore
import PaisesPhone from "./countryPhoneCodes.json"


@Component({
  selector: 'app-armazem-form-geral',
  templateUrl: './armazem-form-geral.component.html',
  styles: []
})
export class ArmazemFormGeralComponent implements OnInit {


  private STORAGE_PAISES: string = "global-paises"
  private STORAGE_ARMAZENS: string = "global-armazens"
  private DELETED_AT_NULL: string = "NULL"

  protected genericObject: any = {}

  protected lista_paises: any[] = []
  private tagifyInst: any;


  constructor(private store: StorageService) {
  }

  testing() {
    Paises.forEach((paises: any) => {

      let myPaise: any = {}
      let county: any = PaisesPhone.find((ps: any) => ps.iso == paises.sigla)

      myPaise.id = this.store.getId()
      myPaise.name = paises.nome_pais
      myPaise.genero = paises.gentilico
      myPaise.iso = paises.sigla
      //myPaise.phone = "";
      //myPaise.phone = county?.code;

      myPaise.externalResquestyCounty = paises
      myPaise.externalResquestyCountyTo = (county ? county : {
        "country": paises.nome_pais,
        "code": "Not found",
        "iso": paises.sigla
      })


      this.store.createdForceGenerateId(myPaise, this.STORAGE_PAISES).then(
        resp => {
          //  (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
          console.log('any success full info')
        },
        err => {
          alert('Ocorreu um determido erro ')
        }
      );

    })
  }


  save() {
    moment().locale('pt-br');
    this.genericObject.paise = (<any>window).instanceSelectedId;

    this.genericObject.enderco = (<any>window).instanceSelectedValueEnder.split(',');

    this.genericObject.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.genericObject.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.genericObject.deleted_at = this.DELETED_AT_NULL;
    this.genericObject.email_auth = 'user activities';

    this.genericObject.id = this.store.getId()

    this.store.createdForceGenerateId(this.genericObject, this.STORAGE_ARMAZENS).then(
      resp => {
        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
      },
      err => {
        alert('Ocorreu um determido erro ')
      }
    );
  }


  initJQueryFunctions() {
    (<any>window).$(($: any) => {

      $('#paises').select2().on('change', (event: any) => {
        (<any>window).instanceSelectedId = event.target.value

      })

      var enderecosTagify = document.querySelector("#tagify_endereco");
      // @ts-ignore
      this.tagifyInst = new Tagify(enderecosTagify, {
        originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(',')
      });

      // @ts-ignore
      enderecosTagify.addEventListener('change', (e: any) => {
        (<any>window).instanceSelectedValueEnder = e.target.value
      })


    })
  }

  ngOnInit(): void {
    this.findAllPaises()
    this.initJQueryFunctions()
  }

  findAllPaises() {
    this.store.findAll(this.STORAGE_PAISES).subscribe(
      resp => {
        this.lista_paises = resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      err => {
      }
    )
  }
}
