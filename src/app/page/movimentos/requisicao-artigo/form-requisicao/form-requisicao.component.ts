import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import ServicePrateleias from "../../../../Services/ServicePrateleias";
import { StorageService } from "../../../../shared/storage.service";
import moment from "moment/moment";
import ServiceUtil from "../../../../Services/ServiceUtil";
import ServiceMovimentoItems from "../../../../Services/ServiceMovimentoItems";
import * as Tagify from "@yaireo/tagify";
import ServiceCountry from "../../../../Services/ServiceCountry";
import ServiceArmazem from "../../../../Services/ServiceStorage";
import ServiceFornecedores from "../../../../Services/ServiceFornecedores";
import ServiceArmario from "../../../../Services/ServiceArmario";
import ServiceNifClient from "../../../../Services/ServiceNifClient";
import { ServiceEmitter } from "../../../../Services/ServiceEmitter";
import ServiceClients from "../../../../Services/ServiceClients";
import ServiceRequestType from 'src/app/Services/ServiceRequestType';
import { Observable } from 'rxjs';
import ServiceEanArticleOrService from 'src/app/Services/ServiceEanArticleOrService';
import ServiceMovimento from 'src/app/Services/ServiceMovimento';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';


//  import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
@Component({
  selector: 'app-form-requisicao',
  templateUrl: './form-requisicao.component.html',
  styleUrls: ['./form-requisicao.component.css']
})
export class FormRequisicaoComponent implements OnInit {

  @ViewChild("selectedProduct", { static: true }) productSelect2!: ElementRef;

  [x: string]: any;

  TYPE_MOVEMENT: string = "OUTPUT";

  private window = (<any>window)
  listOption: any[] = [];
  listTypeRequest: Observable<any>;
  listArticles: any[] = [];

  item: ServiceMovimentoItems;
  move: ServiceMovimento;

  productSelector: any = ""
  listItems: any[] = [];

  util: any = ServiceUtil
  // temporarios

  idMovement: any = "1232423"



  constructor(private store: StorageService, private auth: AuthService, private router: Router) {

    if (!auth.user)
      this.router.navigate(['/auth/sign-in']).then();

    this.setNewOptions()
    this.listTypeRequest = new ServiceRequestType(this.store).findAll();
    this.listArticles = new ServiceEanArticleOrService(this.store).findArticles();

    this.item = new ServiceMovimentoItems(this.store);
    this.move = new ServiceMovimento(this.store);
    this.listItems = new ServiceMovimentoItems(this.store).findInputMovNull(this.TYPE_MOVEMENT);
  }

  async save() {

    this.move.oItem.id = this.idMovement
    this.move.oItem.items = this.listItems;
    this.move.oItem.moveType = this.TYPE_MOVEMENT;




    this.move.save();

    ServiceEmitter.get("actionSendMovimento").emit("");

    this.idMovement = this.store.getId()

  }


  addListItems() {


    this.item.oItem.moveType = this.TYPE_MOVEMENT
    this.item.oItem.move = ServiceUtil.VALUE_AT_NULLABLE
    this.item.oItem.move_id = ServiceUtil.VALUE_AT_NULLABLE

    this.item.save();

    ServiceEmitter.get('actionSendMovimento').emit("")

  }



  async ngOnInit() {

    this.idMovement = this.store.getId()
    this.window.InstanceAplication.init()
    this.initJQuerysFunctions()
  }


  initJQuerysFunctions() {

    this.window.$('#selectedProduct').select2().on('change', (e: any) => {
      this.item.oItem.article = e.target.value
    })

  }



  async cancelerMovement(): Promise<any> {


  }



  /**
   * ***Name*** : Munzambi Ntemo Miguel
   * ***Date*** : 15 de Desembro de 2022
   *
   * ***Description*** ....
   *
   * ```ts
   * setNewOptions() {
   * this.listOption = [
   *   {id: 1, name: "Campos Cliente (Parceiro)", isselected: false},
   *   {id: 2, name: "Campos do Cliente normal", isselected: false},
   *   {id: 3, name: "Com o Campo Nif do Cliente", isselected: false},
   *   {id: 4, name: "Armazem e Localização", isselected: false},
   *   {id: 5, name: "Outro requeisitante", isselected: false} // this is other request
   * ]
   *}
   * tanks
   *
   */

  setNewOptions() {
    this.listOption = [
      { id: 0, name: "Campos do Cliente", isselected: false }
    ]
  }

  enteredNewItem() {
    this.addListItems()
  }

  subcriberFunctionality(attr: any) {
    (<any>window).$(($: any) => {
      (<any>window).instanceSelectedIdProducts = attr.ean
      $('#selectedProduct').val(attr.ean).select2();
    })
  }


  seachingClient() { }
}
