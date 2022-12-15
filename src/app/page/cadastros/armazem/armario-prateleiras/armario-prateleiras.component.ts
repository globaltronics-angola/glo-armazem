import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../../shared/storage.service";
import * as Tagify from "@yaireo/tagify";
import * as moment from "moment";

@Component({
  selector: 'app-armario-prateleiras',
  templateUrl: './armario-prateleiras.component.html',
  styles: []
})
export class ArmarioPrateleirasComponent implements OnInit {

  private STORAGE_ARMAZENS: string = "global-armazens"
  private STORAGE_ARMARIOS: string = "global-armarios"
  private STORAGE_PRATELEIRAS: string = "global-prateleiras"
  private DELETED_AT_NULL: string = "NULL"

  protected armarioO: any = {}
  protected list_unidades: any[] = []
  protected list_armazens: any[] = []
  protected list_type_items: any[] = []

  private prateleiras: any[] = []


  ngOnInit(): void {

    (<any>window).InstanceAplication.init()

    this.findAllArmazens()

    this.initJQueryScripts()
  }


  constructor(private store: StorageService) {
  }

  async save() {

    moment().locale('pt-br');

    this.armarioO.armazem = (<any>window).instanceSelectedIdArmazem;

    this.armarioO.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.armarioO.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.armarioO.deleted_at = this.DELETED_AT_NULL;
    this.armarioO.email_auth = 'user activities';

    this.armarioO.id = (this.armarioO.armario + '-' + (<any>window).instanceSelectedIdArmazem).toUpperCase()

    this.prateleiras = await (<any>window).instanceSelectedValuePrateleira?.split(',')

    this.armarioO.name = this.armarioO.armario.toUpperCase()

    await console.log(this.prateleiras + '  send success full')

    await this.store.createForceMyId(this.armarioO, this.STORAGE_ARMARIOS).then(
      resp => {
        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
        this.prateleiras.forEach((localArray: any) => {
          this.createdPrateleira(localArray, this.armarioO.id)
        })
      },
      err => {
        alert('Ocorreu um determido erro ')
      }
    );
  }

  private createdPrateleira(a: any, armario_id: any) {

    let proteleiraO: any = {}

    proteleiraO.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    proteleiraO.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    proteleiraO.deleted_at = this.DELETED_AT_NULL;

    proteleiraO.email_auth = 'user activities';
    proteleiraO.id = (a + '-' + armario_id).toUpperCase();
    proteleiraO.armario = armario_id;
    proteleiraO.name = (a).toUpperCase();

    this.store.createForceMyId(proteleiraO, this.STORAGE_PRATELEIRAS).then(
      () => {
      },
      err => {
        alert('Ocorreu um determido erro ')
      }
    )
  }

  findAllArmazens() {
    this.store.findAll(this.STORAGE_ARMAZENS).subscribe(
      resp => {
        this.list_armazens = resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      err => {
      }
    )
  }


  initJQueryScripts() {
    (<any>window).$(($: any) => {

      $('#armazensSelect').select2().on('change', (event: any) => {
        (<any>window).instanceSelectedIdArmazem = event.target.value

      })

      var prateleirasItensTagify = document.querySelector("#prateleirasItens");
      // @ts-ignore
      new Tagify(prateleirasItensTagify, {
        originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(',')
      });

      // @ts-ignore
      prateleirasItensTagify.addEventListener('change', (e: any) => {
        (<any>window).instanceSelectedValuePrateleira = e.target.value
      })


    })
  }
}
