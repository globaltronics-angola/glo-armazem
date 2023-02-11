import {Component, OnInit} from '@angular/core';
import {collection, getCountFromServer, getFirestore} from "@angular/fire/firestore";
import ServiceArticles from "../../../Services/ServiceArticles";

@Component({
  selector: 'app-wdget-counter',
  templateUrl: './wdget-counter.component.html',
  styles: []
})
export class WdgetCounterComponent implements OnInit {

  totalProdutos: string = "0";
  qt:number= 0;

  constructor() {}

  async ngOnInit() {
    const snapsHost = await getCountFromServer(collection(getFirestore(), ServiceArticles.STORAGE_ARTICLES));
    const quanty = snapsHost.data().count;
    if (quanty >= 1000) {
      this.totalProdutos = (quanty / 1000).toFixed(1) + 'k';
    } else {
      this.totalProdutos = "" + quanty;
    }

    this.qt = quanty;

  }

  listaQuatidades(){

  }

}
