import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";
import { GoogleAuthProvider } from "@angular/fire/auth"
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from "rxjs"
import AuthLocal from "./auth.json"


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
  async signInGoogleProvider() {

    this.user = AuthLocal.user;

    /* const login = await this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(
      async resp => { this.user = resp.user; },
      err => { console.log(err.message) }
    ); */


    await this.router.navigate(['/']).then();
    await localStorage.setItem('token', JSON.stringify(this.user?.uid))
    await sessionStorage.setItem('_user', JSON.stringify(this.user));

    (<any>window).sentMessageSuccess.init("Bem vindo ao sistema")

    /* await firstValueFrom(this.fs.collection('/users').doc('/' + this.user.email).valueChanges())
      .then(async (as: any) => {
        try {
          if (as.email) {
            await this.router.navigate(['/']).then()
            await localStorage.setItem('token', JSON.stringify(this.user?.uid))
            await sessionStorage.setItem('_user', JSON.stringify(this.user));

            (<any>window).sentMessageSuccess.init("Bem vindo ao sistema")

          } else {
            this.router.navigate(['/auth/sign-in']).then();
            (<any>window).sentMessageError.init("não foi autorizado a conectar se no sistema")
          }
        } catch (error) {
          (<any>window).sentMessageError.init("não foi autorizado a conectar se no sistema")
        }

      }) */

  }


  private getUser(_token: string): any {
    return JSON.parse(atob(_token.split('.')[1]))
  }

}
