import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-ocorencias-artigo',
  templateUrl: './ocorencias-artigo.component.html',
  styles: []
})
export class OcorenciasArtigoComponent implements OnInit {
  public title: string = "Movimentos";

  constructor(private router: Router) {
    this.functionInit()
    setTimeout(() => {
      this.functionInit();
    }, 1000)
  }

  async ngOnInit() {

    await this.functionInit()
  }

  functionInit() {
    switch (this.router.url) {
      case "/stock/movimento/inventario":
        this.title = "Inventário";
        break;

      case "/stock/ocorrencias/tabela":
        this.title = "Ocorrência";
        break;

      case "/stock/movimento/tabela":
        this.title = "Movimento";
        // console.log(this.router.url)
        break;

      default:
        this.title = "";

    }
  }
}
