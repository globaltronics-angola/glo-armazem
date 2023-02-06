import {Component} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-wdget-chart',
  templateUrl: './wdget-chart.component.html',
  styles: []
})
export class WdgetChartComponent {

  user: any;

  constructor(private auth: AuthService, private router: Router,) {
    if (!this.auth.user)
      this.router.navigate(['/auth/sign-in']).then();

    console.log(this.auth.user)

    this.user = this.auth.user;
  }
}
