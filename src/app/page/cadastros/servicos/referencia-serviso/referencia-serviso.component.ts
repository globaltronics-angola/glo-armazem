import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../../shared/storage.service";
import ServiceServicos from 'src/app/Services/ServiceServicos';
import { Observable } from 'rxjs';
import ServiceEanArticleOrService from 'src/app/Services/ServiceEanArticleOrService';
import { ServiceEmitter } from 'src/app/Services/ServiceEmitter';

@Component({
  selector: 'app-referencia-serviso',
  templateUrl: './referencia-serviso.component.html',
  styles: [
  ]
})
export class ReferenciaServisoComponent implements OnInit {


  protected eanRefeModel: any = {}
  listServices: Observable<any>;
  private window = (<any>window);
  ean: ServiceEanArticleOrService;

  ngOnInit(): void {

    this.window.InstanceAplication.init()
    this.initJQuerysInits()
  }

  constructor(private store: StorageService) {
    this.listServices = new ServiceServicos(this.store).findAll();
    this.ean = new ServiceEanArticleOrService(this.store);
  }

  initJQuerysInits() {

    this.window.$('#selectProdutos')
      .select2()
      .on('change', (e: any) => {
        this.window.instanceSelectedIdProduct = e.target.value
      })

  }

  save() {

    console.log(this.ean.IObjectClass);

    this.ean.IObjectClass.article_id = JSON.parse(this.window.instanceSelectedIdProduct.toString());

    ServiceEmitter.get('sendNewLineRe').emit(this.ean.IObjectClass);
    this.ean.save()
  }


}
