import {Component, OnInit} from '@angular/core';
import * as Tagify from "@yaireo/tagify";
import {StorageService} from "../../../../shared/storage.service";
import * as moment from "moment/moment";

@Component({
  selector: 'app-forms-geral-fornecedores',
  templateUrl: './forms-geral-fornecedores.component.html',
  styles: []
})
export class FormsGeralFornecedoresComponent implements OnInit {


  private DELETED_AT_NULL: any = "NULL"
  list_departments: any[] = []

  fornecedor: any = {}

  private STORAGE_DEPARTMENTS: any = "global-departments"
  private STORAGE_CLIENTS: string = "global-forncedores"

  constructor(private store: StorageService) {
  }


  initJQuerysFuncitions() {

    (<any>window).$(function ($: any) {


      $('#departamentosSelectForne').select2().on('change', (e: any) => {
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

  ngOnInit(): void {
    (<any>window).InstanceAplication.init()
    this.initJQuerysFuncitions()

    this.findAllDepartments()
  }


  save() {
    moment().locale('pt-br');
    this.fornecedor.others = []
    this.fornecedor.departmentId = "NULL"

    this.fornecedor.departmentId = (<any>window).instanceSelectedIdDepartments;

    this.fornecedor.others = (<any>window).instanceSelectedValueOtherInfo?.split(',');

    this.fornecedor.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.fornecedor.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.fornecedor.deleted_at = this.DELETED_AT_NULL;
    this.fornecedor.email_auth = 'user activities';

    this.fornecedor.id = ""
    console.log(this.fornecedor)
    this.store.create(this.fornecedor, this.STORAGE_CLIENTS).then(
      resp => {
        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')
        console.log(resp.id)
      },
      err => {
        alert('Ocorreu um determido erro ')
      }
    );
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
