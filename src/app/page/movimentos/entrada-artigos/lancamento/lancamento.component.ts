import {Component, OnInit} from '@angular/core';
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import ServiceMovimento from "../../../../Services/ServiceMovimento";
import {StorageService} from "../../../../shared/storage.service";
import ServiceUtil from "../../../../Services/ServiceUtil";

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styles: []
})
export class LancamentoComponent implements OnInit {

  list_produtos: any[] = []

  constructor(private store: StorageService) {
  }

  async ngOnInit() {
   // this.list_produtos = await ServiceMovimento.findINPUT(this.store)
  }

  somarGeral(dataArry: any) {

    console.log(dataArry)
  }


  deleteMovementAndItems(attr: string) {
    /* this.store.deleted(ServiceUtil.STORAGE_MOVEMENT, attr).then(async () => {

      const listMyItems = await ServiceMovimentoItems.findByMovement(this.store, attr);
      console.log('success full')
      listMyItems.forEach((eKa: any) => {
        this.store.deleted(ServiceUtil.STORAGE_ITEM_MOVIMENTO, eKa.id).then(()=>{
            console.log('success full')
        }, err=>{
            console.log('error full')
        })
      })

    }, err => {

    }) */
  }




}
