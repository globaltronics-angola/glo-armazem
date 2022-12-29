import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../shared/storage.service";
import ServiceDepartment from 'src/app/Services/ServiceDepartment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styles: []
})
export class DepartmentsComponent implements OnInit {

  protected DELETED_AT_NULL: string = "NULL"
  protected STORAGE_NAME: string = "global-departments"

  department: ServiceDepartment
  listDepartment: Observable<any>;

  constructor(private store: StorageService) {

    this.department = new ServiceDepartment(this.store);
    this.listDepartment = this.department.findAll();

  }

  ngOnInit(): void {  }

  save() {
    this.department.save();
  }

  editing(attr: any) {
    this.department.IObjectClass = attr;
    this.department.IObjectClass.updated_mode = true

  }

  delete(attr: any) {
    this.department.IObjectClass = attr;
    this.department.delete()
  }


}
