import {Component, NgZone} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-wdget-storage',
  templateUrl: './wdget-storage.component.html',
  styles: [
  ]
})
export class WdgetStorageComponent {

  constructor( private ngZone: NgZone, private router: Router) {
  }

}
