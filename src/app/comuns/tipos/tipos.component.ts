import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from "../../shared/storage.service";
import * as moment from "moment/moment";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import ServiceTipos from 'src/app/Services/ServiceTipos';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.css']
})
export class TiposComponent implements OnInit, OnDestroy {

  protected type: any = {};
  private DELETED_AT_NULL: string = 'NULL' // propriety null if not deleted values
  private STORAGE_NAME: string = 'global-tipos' // nome da collection

  list_modelos$: Observable<any[]> | undefined;

  sink: Subscription | undefined
  typeClass: ServiceTipos;

  constructor(private store: StorageService) {
    this.typeClass = new ServiceTipos(this.store);

    this.list_modelos$ = this.typeClass.findAll();

  }
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  save(): void {

    this.typeClass.save()
  }







}
