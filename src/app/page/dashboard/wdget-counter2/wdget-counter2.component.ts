import {Component, OnInit} from '@angular/core';
import ServiceUsers from "../../../Services/ServiceUsers";
import {StorageService} from "../../../shared/storage.service";
import {Observable} from "rxjs";
import {collection, getCountFromServer, getFirestore} from "@angular/fire/firestore";
import {MetricsService} from "../../../shared/metrics.service";
import {AuthService} from "../../../shared/auth.service";



@Component({
  selector: 'app-wdget-counter2',
  templateUrl: './wdget-counter2.component.html',
  styles: [
  ]
})
export class WdgetCounter2Component implements OnInit{
  public utilizadores: Observable<any>;
  public countUsers: number = 0;

  constructor(private store:StorageService, public auth: AuthService) {
    this.utilizadores = new ServiceUsers(this.store).findAll()
  }

 async ngOnInit() {

    this.countUsers = await this.getCounterInfo();
  }

  async getCounterInfo() {
    const snapsHost = await getCountFromServer(collection(getFirestore(), 'users'));
    return snapsHost.data().count;
  }

  textToColor(text: string): string {
    let color = "";
    for (let i = 0; i < text.length; i++) {
      let hex = text.charCodeAt(i).toString(16);
      color += hex.length == 1 ? "0" + hex : hex;
    }

    return '#'+ color.slice(3,9) + '65';
  }



}
