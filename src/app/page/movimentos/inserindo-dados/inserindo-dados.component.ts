import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import ServiceStorage from 'src/app/Services/ServiceStorage';
import { StorageService } from 'src/app/shared/storage.service';

//@ts-ignore
import Dados from "./TDArtigos.json"

@Component({
  selector: 'app-inserindo-dados',
  templateUrl: './inserindo-dados.component.html',
  styleUrls: ['./inserindo-dados.component.css']
})
export class InserindoDadosComponent implements OnInit {

  public arrayData: any[] = Dados;

  listStorage: Observable<any>;

  public window = (<any>window);


  constructor(private store: StorageService) {
    this.listStorage = new ServiceStorage(this.store).findAll();
  }

  ngOnInit(): void {


  }

  public dataRow(attr: any) {

    console.log(attr);
  }

  initJQuerysFunctions() {

    this.window.$('#selectedArmazem').select2({ minimumResultsForSearch: -1 }).on('change', async (e: any) => {


    });

    this.window.$('#selectedArmario').select2({ minimumResultsForSearch: -1 }).on('change', async (e: any) => {

    })

    this.window.$('#selectedPrateleira').select2({ minimumResultsForSearch: -1 }).on('change', (e: any) => {

    })

  }



}
