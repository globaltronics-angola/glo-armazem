import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent implements OnInit {

  displayName: any = ""
  user: any = {}

  window = (<any>window);

  constructor(private auth: AuthService,  private router: Router) {


    if (!auth.user)
      this.router.navigate(['/auth/sign-in']).then();


    this.user = auth.user;

    console.log(auth.user)
  }
  ngOnInit(): void {
    this.window.InstanceAplication.init()
  }


  signOutFunction(){
    this.auth.signOut()
    sessionStorage.setItem('_user','')
  }

}
