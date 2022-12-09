import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../shared/storage.service";
import * as moment from "moment";

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styles: []
})
export class DepartmentsComponent implements OnInit {

  protected DELETED_AT_NULL: string = "NULL"
  protected STORAGE_NAME: string = "global-departments"

  protected department: any = {}
  protected list_departments: any[] = []

  constructor(private store: StorageService) {  }

  ngOnInit(): void {
    this.findAll()
  }

  save() {

    const now = new Date();

    // tendo em conta que os departamentos não devem ter nomes iguail então a chave sera o nome....
    this.department.id = this.department.name.toUpperCase().replace(' ','_' );
    this.department.created_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.department.updated_at = moment().format('DD MM,YYYY HH:mm:ss')
    this.department.deleted_at = this.DELETED_AT_NULL;
    this.department.email_auth = 'user activities';

    this.store.createForceMyId(this.department, this.STORAGE_NAME).then(
      () => {

        (<any>window).sentMessageSuccess.init('foi inserido com sucesso')

      },
      err => {
        alert('ocorencia de erro no sistema')
      }
    );
  }


  findAll() {
    this.store.findAll(this.STORAGE_NAME).subscribe(
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
