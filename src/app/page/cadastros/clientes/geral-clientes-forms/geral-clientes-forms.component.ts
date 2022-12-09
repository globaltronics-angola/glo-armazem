import {Component, OnInit} from '@angular/core';
import * as Tagify from "@yaireo/tagify";
import {StorageService} from "../../../../shared/storage.service";
import * as moment from "moment";

@Component({
  selector: 'app-geral-clientes-forms',
  templateUrl: './geral-clientes-forms.component.html',
  styles: []
})
export class GeralClientesFormsComponent implements OnInit {

  list_departments: any[] = []
  client: any = {}

  private DELETED_AT_NULL: any = "NULL"

  private STORAGE_DEPARTMENTS: any = "global-departments"
  private STORAGE_CLIENTS: string = "global-clients"


  save() {
    moment().locale('pt-br');
    this.client.departmentId = (<any>window).instanceSelectedIdDepartments;

    this.client.others = (<any>window).instanceSelectedValueOtherInfo.split(',');

    this.client.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.client.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.client.deleted_at = this.DELETED_AT_NULL;
    this.client.email_auth = 'user activities';

    this.client.id = ""
    console.log(this.client)
    this.store.create(this.client, this.STORAGE_CLIENTS).then(
      resp => {
        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
        console.log(resp.id)
      },
      err => {
        alert('Ocorreu um determido erro ')
      }
    );
  }

  ngOnInit() {
    this.initJQuerysFuncitions()
    this.findAllDepartments()
  }

  constructor(private store: StorageService) {
  }


  initJQuerysFuncitions() {
    (<any>window).$(function ($: any) {

      $('#departmentsSelect').select2().on('change', (e: any) => {
        (<any>window).instanceSelectedIdDepartments = e.target.value

      })

      const otherInfo = document.querySelector("#otherInfoMultipleItems");

      // @ts-ignore
      new Tagify(otherInfo, {
        originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(',')
      });

      // @ts-ignore
      otherInfo.addEventListener('change', (e: any) => {
        (<any>window).instanceSelectedValueOtherInfo = e.target.value
      })

    })
  }

  findAllDepartments() {
    this.store.findAll(this.STORAGE_DEPARTMENTS).subscribe(
      resp => {
        this.list_departments = resp.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      err => {
      }
    )
  }



}
