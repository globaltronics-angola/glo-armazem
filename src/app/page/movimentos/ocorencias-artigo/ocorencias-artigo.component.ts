import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-ocorencias-artigo',
  templateUrl: './ocorencias-artigo.component.html',
  styles: []
})
export class OcorenciasArtigoComponent {
  public title: string = "Ocorrência";

  constructor(private router: Router) {

    if ('/stock/movimento/tabela' == this.router.url) {
      this.title = "Movimentos"
    }
  }
}
