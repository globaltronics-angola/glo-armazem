import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/shared/auth.service';
import {firstValueFrom} from "rxjs";
import {StorageService} from "../../shared/storage.service";

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {

  displayName: any = ""
  user: any = {}
  photoUrl: any = "";
  window = (<any>window);

  constructor(private auth: AuthService, private router: Router, private store: StorageService) {



    if (!this.auth.user)
      this.router.navigate(['/auth/sign-in']).then();


    this.user = this.auth.user;


  }

  async ngOnInit() {

    this.window.InstanceAplication.init()
    this.photoUrl = await this.user.photoURL

  }


  signOutFunction() {
    this.auth.signOut()
    sessionStorage.setItem('_user', '')
  }

}
