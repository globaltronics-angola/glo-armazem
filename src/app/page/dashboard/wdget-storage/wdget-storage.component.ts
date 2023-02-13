import {Component, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "../../../shared/storage.service";
import ServiceMovimento from "../../../Services/ServiceMovimento";
import moment from "moment";
import ServiceUtil from "../../../Services/ServiceUtil";

@Component({
  selector: 'app-wdget-storage',
  templateUrl: './wdget-storage.component.html',
  styles: []
})
export class WdgetStorageComponent {
  totalMovimento: number = 0;
  util: any = ServiceUtil

  constructor(private store: StorageService, private ngZone: NgZone, private router: Router) {
    this.entradasNoMes()
  }

  public entradasNoMes() {

    this.store.getFirestore().collection(ServiceMovimento.STORAGE_NAME)
      .where('mouth', '==', moment().format('MM'))
      .get()
      .then(e => {

        this.totalMovimento = e.docs.length;

        console.log(e.docs.map(at => {
          return at.data()
        }));
      })


  }

}
