import { Component, OnInit } from '@angular/core';
import ServiceArmario from 'src/app/Services/ServiceArmario';
import { StorageService } from "../../../../shared/storage.service";

@Component({
  selector: 'app-tabela-armario',
  templateUrl: './tabela-armario.component.html',
  styles: []
})

export class TabelaArmarioComponent implements OnInit {


  private window = (<any>window)

  protected listArmarios: any[] = []
  serviceArmario: ServiceArmario;

  constructor(private store: StorageService) {
    this.serviceArmario = new ServiceArmario(this.store);

  }

  ngOnInit(): void {

    this.window.InstanceAplication.init()
    this.scriptFunction();

  }

  scriptFunction() {

    const storageSelect = this.window.$('#storageSelect');
    storageSelect.select2().on('change', async (e: any) => {
      this.listArmarios = await this.serviceArmario.findByName(e.target.value)
    })
  }

}
