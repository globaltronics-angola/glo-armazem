import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from "@angular/router";
import {GoogleAuthProvider} from "@angular/fire/auth"
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {firstValueFrom} from "rxjs"
import AuthLocal from "./auth.json"
import {StorageService} from "./storage.service";
import {StorageValidateAnyService} from "./storage.validate.any.service";
import ServiceUsers from "../Services/ServiceUsers";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user: any;
  private serviceU: StorageValidateAnyService;
  private window = (<any>window);
  store: any

  constructor(private ngZone: NgZone, private fireAuth: AngularFireAuth,
              private router: Router, private fs: AngularFirestore) {

    let userInfo = sessionStorage.getItem('_user') as string
    if (userInfo != '')
      this.user = JSON.parse(userInfo);

    this.store = new StorageService(this.fs);
    this.serviceU = new StorageValidateAnyService(this.store, 'users');
  }


  // Sign In method
  signIn(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      async (resp: any) => {
        localStorage.setItem('token', resp.user?.refreshToken);
        let dataUs = resp.user
        await firstValueFrom(this.fs.collection('/users').doc('/' + email).valueChanges())
          .then(async (as: any) => {
            dataUs.type = as.type;
            if (!as.photo) {
              await this.signInGoogleProvider()
            }
          });
        this.router.navigate(['/']).then();

        this.user = resp.user;
        sessionStorage.setItem('_user', JSON.stringify(dataUs));
      },
      err => {
        this.router.navigate(['/auth/sign-in']).then();
      }
    )
  }


  // Sign Up method
  signUp(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      () => {
        this.router.navigate(['/auth/sign-in']).then();
      },
      err => {
        this.router.navigate(['/auth/sign-up']).then();
      }
    )

  }

  // Sign Out method
  signOut() {
    this.fireAuth.signOut().then(
      () => {
        this.router.navigate(['/auth/sign-in']).then()
      },
      err => {
      }
    )
  }


  // Sign In with Google provider service
  async signInGoogleProvider() {

    this.user = AuthLocal.user;

    const login = await this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(
      async resp => {
        this.user = resp.user;
      },
      err => {
        // console.log(err.message)
      }
    );

    await this.serviceU.validateExiste(this.user.email, 'email',
      false, this.window.$('#devolucaoProduct'), false, "", true, true)

    await setTimeout(() => {
      firstValueFrom(this.fs.collection('/users').doc('/' + this.user.email).valueChanges())
        .then(async (as: any) => {
          try {
            if (as.email) {
              await this.router.navigate(['/']).then()
              await localStorage.setItem('token', JSON.stringify(this.user?.uid))
              await sessionStorage.setItem('_user', JSON.stringify(this.user));

              (<any>window).sentMessageSuccess.init("Bem vindo ao sistema")
              this.user.type = as.type
              if (!as.photo) {
                let modeUse = new ServiceUsers(this.store)
                modeUse.Model.photo = this.user.photoURL;
                modeUse.Model.provaider = this.user;
                modeUse.save()
              }

            } else {
              this.router.navigate(['/auth/sign-in']).then();
              (<any>window).sentMessageError.init("não foi autorizado a conectar se no sistema")
            }
          } catch (error) {
            (<any>window).sentMessageError.init("não foi autorizado a conectar se no sistema")
          }
        })
    }, 2000)


  }


  private getUser(_token: string): any {
    return JSON.parse(atob(_token.split('.')[1]))
  }

}
