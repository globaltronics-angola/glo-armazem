import { Component, OnInit, OnDestroy } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import ServiceEanArticleOrService from 'src/app/Services/ServiceEanArticleOrService';
import { ServiceEmitter } from 'src/app/Services/ServiceEmitter';
import { StorageService } from "../../shared/storage.service";

@Component({
  selector: 'app-referencias-servicos',
  templateUrl: './referencias-servicos.component.html',
  styles: [
  ]
})
export class ReferenciasServicosComponent implements OnInit, OnDestroy {

  protected list_ean_sevicos: any[] = [];
  private window = (<any>window);
  snKnow: any;



  ngOnInit(): void {

    this.initJQuerysFunciotions()
  }

  constructor(private store: StorageService) {
    this.findAll()
    this.snKnow = ServiceEmitter.get("sendNewLineRe").subscribe(e => this.list_ean_sevicos.push(e));
  }
  ngOnDestroy(): void {
    this.snKnow.unsubscribe();
  }

  // firstValueFrom
  async findAll() {
    this.list_ean_sevicos = await firstValueFrom(new ServiceEanArticleOrService(this.store).findAll());
  }


  initJQuerysFunciotions() {
    this.window.$('#selectProdutos').on('change', async (e: any) => {

      this.list_ean_sevicos = await new ServiceEanArticleOrService(this.store)
        .findByArticleId(e.target.value)

    })
  }

}
