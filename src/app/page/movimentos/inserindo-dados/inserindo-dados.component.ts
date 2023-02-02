import { Component, OnInit } from '@angular/core';

//@ts-ignore
import Dados from "./TDArtigos.json"

@Component({
  selector: 'app-inserindo-dados',
  templateUrl: './inserindo-dados.component.html',
  styleUrls: ['./inserindo-dados.component.css']
})
export class InserindoDadosComponent implements OnInit{

  public arrayData: any[] = Dados;

  ngOnInit(): void {


  }



}
