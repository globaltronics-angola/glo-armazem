import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import ServiceArmario from 'src/app/Services/ServiceArmario';
import { ServiceEmitter } from 'src/app/Services/ServiceEmitter';
import { StorageService } from "../../../../shared/storage.service";

@Component({
  selector: 'app-tabela-armario',
  templateUrl: './tabela-armario.component.html',
  styles: []
})

export class TabelaArmarioComponent implements OnInit, OnDestroy {


  private window = (<any>window)

  protected listArmarios: any[] = []
  serviceArmario: ServiceArmario;
  snow: Subscription | undefined;
  instanceSelect: any;

  constructor(private store: StorageService) {
    this.serviceArmario = new ServiceArmario(this.store);
    this.snow = ServiceEmitter.get("sendArmarioZone")
      .subscribe(async () => this.listArmarios = await this.serviceArmario.findByName(this.instanceSelect) );

    // this.listArmarios = await this.findAnyListArmarios(this.instanceSelect)
  }
  ngOnDestroy(): void {
    this.snow?.unsubscribe();
  }

  ngOnInit(): void {

    this.window.InstanceAplication.init()
    this.scriptFunction();

  }

  scriptFunction() {

    const storageSelect = this.window.$('#storageSelect');
    storageSelect.select2().on('change', async (e: any) => {
      this.listArmarios = await this.serviceArmario.findByName(e.target.value)
      this.instanceSelect = e.target.value;
    })
  }


}
