import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../../shared/storage.service";

@Component({
  selector: 'app-tabela-armario',
  templateUrl: './tabela-armario.component.html',
  styles: []
})

export class TabelaArmarioComponent implements OnInit {

  private STORAGE_ARMARIOS: string = "global-armarios"
  private STORAGE_PRATELEIRAS: string = "global-prateleiras"

  protected list_armarios: any[] = []

  constructor(private store: StorageService) {
  }

  ngOnInit(): void {

    (<any>window).InstanceAplication.init()

    this.findAllArmarios()

  }

  findAllArmarios() {
    this.store.findAll(this.STORAGE_ARMARIOS).subscribe(
      resp => {
        this.list_armarios = resp.map( (e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;

          data.prateleiras = []
           this.store.findAll(this.STORAGE_PRATELEIRAS).subscribe(
            respPrate => {
              data.prateleiras = respPrate.map((a: any) => {
                let c = a.payload.doc.data()
                c.id = a.payload.doc.id
                return c
              }).filter(cY => cY.armario == data.id)
            },
            err => {

            }
          );

          return data;
        })
      },
      err => {
      }
    )
  }

  listParameter(attr: any): [] {

    console.log(attr.slice(0,3))

    return attr
  }
}
