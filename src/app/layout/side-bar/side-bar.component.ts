import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import ServiceUtil from 'src/app/Services/ServiceUtil';
import {AuthService} from 'src/app/shared/auth.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],

})
export class SideBarComponent implements OnInit {
  user: any;
  photoUrl: string = "";
  routerNav: Router;
  util: any = ServiceUtil;

  constructor(public auth: AuthService, private router: Router) {
    if (!this.auth.user)
      this.router.navigate(['/auth/sign-in']).then();

    this.routerNav = this.router;
    this.photoUrl = this.auth.user.photoUrl;

  }


  ngOnInit(): void {

    this.photoUrl = this.auth.user.photoURL

  }

}
