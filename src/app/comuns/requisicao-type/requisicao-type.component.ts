import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../shared/storage.service";
import moment from "moment";
import ServiceUtil from "../../Services/ServiceUtil";
import ServiceRequestType from 'src/app/Services/ServiceRequestType';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-requisicao-type',
  templateUrl: './requisicao-type.component.html',
  styles: []
})
export class RequisicaoTypeComponent implements OnInit {
  protected type: any = {};
  private DELETED_AT_NULL: string = 'NULL' // propriety null if not deleted values

  protected list_modelos: any = [];


  sType: ServiceRequestType;
  listRequestType: Observable<any>;
  private window = (<any>window);

  constructor(private store: StorageService) {

    this.sType = new ServiceRequestType(this.store)
    this.listRequestType = this.sType.findAll();
  }

  save(): void {

    this.sType.save();
  }

  ngOnInit(): void {}

  deleteObj(attr: any) {
    this.sType.IObjectClass = attr;
    this.sType.delete()
  }

  editObjs(attr: any) {
    this.sType.IObjectClass = attr
    this.sType.IObjectClass.updated_mode = true
  }

}
