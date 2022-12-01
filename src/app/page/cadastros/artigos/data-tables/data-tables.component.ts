import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/auth.service";
import {StorageService} from "../../../../shared/storage.service";

@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.css']
})
export class DataTablesComponent implements OnInit {

  STORAGE_PRODUCT: string = 'global-produtos'
  STORAGE_MODELOS: string = 'global-modelos'
  list_produtos: any[] = [];

  constructor(private auth: AuthService, private store: StorageService) {

  }

  ngOnInit(): void {
    this.findAlProduts()
  }


  findAlProduts() {
    this.store.findAll(this.STORAGE_PRODUCT).subscribe(
      resp => {
        this.list_produtos = resp.map((e: any) => {

          let querySelecty: any = e.payload.doc.data();

          const data = querySelecty;

          if (querySelecty.modeloId)
            this.store.findById(this.STORAGE_MODELOS, querySelecty.modeloId).subscribe(
              dataSet => {
                data.modelo = dataSet
              }
            )

          data.id = e.payload.doc.id;

          return data;
        })
      },
      err => {
      }
    )

  }

}
