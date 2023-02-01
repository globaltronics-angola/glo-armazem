import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../shared/auth.service";
import { StorageService } from "../../../../shared/storage.service";
import ServiceServicos from 'src/app/Services/ServiceServicos';
import ServiceTipos from 'src/app/Services/ServiceTipos';
import { Observable } from 'rxjs';
import ServiceCategories from 'src/app/Services/ServiceCategories';

@Component({
  selector: 'app-form-geral-servico',
  templateUrl: './form-geral-servico.component.html',
  styles: [
  ]
})
export class FormGeralServicoComponent implements OnInit {

  private window = (<any>window);
  oo: ServiceServicos;
  listType: Observable<any>;
  listCategory: Observable<any>;

  constructor(private auth: AuthService, private store: StorageService) {
    this.oo = new ServiceServicos(this.store);
    this.listType = new ServiceTipos(this.store).findAll();
    this.listCategory = new ServiceCategories(this.store).findAll();


  }


  ngOnInit(): void {

    this.window.InstanceAplication.init()
    this.eventChang();
  }


  save() {

    this.oo.IObjectClass.type = JSON.parse(this.window.instanceSelectedId.toString());

    this.oo.IObjectClass.categories = JSON.parse('[' + this.window.instanceSelectedIdCategories.toString().replace('\n', '') + ']');


    this.oo.save()

  }




  eventChang() {

    const tiposSevico = this.window.$('#modelos');
    const categorySevico = this.window.$('#categorias');

    tiposSevico.select2().on('change', (event: any) => {
      this.window.instanceSelectedId = event.target.value
    })

    categorySevico.select2().on('change', (event: any) => {
      this.window.instanceSelectedIdCategories = categorySevico.select2("val");
    })

  }


}
