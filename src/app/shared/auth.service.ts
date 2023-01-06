import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";
import { GoogleAuthProvider } from "@angular/fire/auth"
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom} from "rxjs"


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user: any;
  constructor(private fireAuth: AngularFireAuth, private router: Router, private fs: AngularFirestore) {

    let userInfo = sessionStorage.getItem('_user') as string
    if (userInfo != '')
      this.user = JSON.parse(userInfo);

    console.log(this.user);
  }



  // Sign In method
  signIn(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      (resp: any) => {
        localStorage.setItem('token', resp.user?.refreshToken);
        this.router.navigate(['/']).then();


        this.user = resp.user;
        sessionStorage.setItem('_user', JSON.stringify(resp.user));
      },
      err => {
        console.log('email and password invalid');
        this.router.navigate(['/auth/sign-in']).then();
      }
    )
  }


  // Sign Up method
  signUp(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      () => {
        console.log('success full created user to firebase application ');
        this.router.navigate(['/auth/sign-in']).then();
      },
      err => {
        console.log('email and password invalid');
        this.router.navigate(['/auth/sign-up']).then();
      }
    )

  }

  // Sign Out method
  signOut() {
    this.fireAuth.signOut().then(
      () => {
        console.log('sign out success full')
        this.router.navigate(['/auth/sign-in']).then()
      },
      err => {
        console.log(err.message)
      }
    )
  }


  // Sign In with Google provider service
  signInGoogleProvider() {




    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(
      resp => {

        console.log(resp);
        this.user = resp.user;



        firstValueFrom(this.fs.collection('/users').doc('/' + this.user.email).valueChanges())
        .then(()=>{
          this.router.navigate(['/']).then()
          localStorage.setItem('token', JSON.stringify(resp.user?.uid))


          sessionStorage.setItem('_user', JSON.stringify(this.user));
        })


      },
      err => {
        console.log(err.message)
      }
    );
  }


  private getUser(_token: string): any {
    return JSON.parse(atob(_token.split('.')[1]))
  }

}
