>> Munzambi Ntemo Miguel

```ts
import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../../shared/storage.service";
import * as Tagify from "@yaireo/tagify";
import moment from "moment";
import ServiceStorage from 'src/app/Services/ServiceStorage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-armario-prateleiras',
  templateUrl: './armario-prateleiras.component.html',
  styles: []
})
export class ArmarioPrateleirasComponent implements OnInit {

  private window = (<any>window);

  private STORAGE_ARMARIOS: string = "global-armarios"
  private STORAGE_PRATELEIRAS: string = "global-prateleiras"
  private DELETED_AT_NULL: string = "NULL"

  protected armarioO: any = {}
  protected list_unidades: any[] = []
  protected list_armazens: any[] = []
  protected list_type_items: any[] = []

  private prateleiras: any[] = []

  listStorage: Observable<any>;


  ngOnInit(): void {

    this.window.InstanceAplication.init()
    this.initJQueryScripts()
  }


  constructor(private store: StorageService) {

    this.listStorage = new ServiceStorage(this.store).findAll()
  }

  async save() {

    moment().locale('pt-br');

    this.armarioO.armazem = (<any>window).instanceSelectedIdArmazem;

    this.armarioO.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.armarioO.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.armarioO.deleted_at = this.DELETED_AT_NULL;
    this.armarioO.email_auth = 'user activities';

    this.armarioO.id = (this.armarioO.armario + '-' + this.window.instanceSelectedIdStorage).toUpperCase()

    this.prateleiras = await (<any>window).instanceSelectedValuePrateleira?.split(',')

    this.armarioO.name = this.armarioO.armario.toUpperCase()

    await // console.log(this.prateleiras + '  send success full')

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




  initJQueryScripts() {

    const storageSelect = this.window.$('#stotageSelect');
    const prateleirasItemsTagify = document.querySelector("#prateleirasItens");

    storageSelect.select2().on('change', (event: any) => {
      this.window.instanceSelectedIdStorage = event.target.value
    })

    // @ts-ignore
    new Tagify(prateleirasItemsTagify, {
      originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(',')
    });

    // @ts-ignore
    prateleirasItemsTagify.addEventListener('change', (e: any) => {
      this.window.instanceSelectedIdStorage = e.target.value
    })
  }
}

