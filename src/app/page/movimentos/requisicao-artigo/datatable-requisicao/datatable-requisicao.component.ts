import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-datatable-requisicao',
  templateUrl: './datatable-requisicao.component.html',
  styles: []
})
export class DatatableRequisicaoComponent implements OnInit {

  list_items: any[] = []

  ngOnInit(): void {

    this.initFunctionsJQuery()

  }


  kFormatter(attr : string){
    return attr
  }

  deleteInfo(attr: string){

  }

  initFunctionsJQuery() {
    (<any>window).$(function ($: any) {



    })
  }

}
