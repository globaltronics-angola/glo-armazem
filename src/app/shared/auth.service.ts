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
    console.log('esta aqui 1')
    try {
      console.log('esta aqui 1.2')
      this.fireAuth.signInWithEmailAndPassword(email, password).then(
        async (resp: any) => {
          console.log('esta aqui 2')
          localStorage.setItem('token', resp.user?.refreshToken);
          let dataUs = resp.user
          await firstValueFrom(this.fs.collection('/users').doc('/' + email).valueChanges())
            .then(async (as: any) => {
              dataUs.type = as?.type;
              console.log('esta aqui 3')
              if (!as?.photo && email.includes('@gmail.com')) {
                await this.signInGoogleProviderTo(as)
              }
            });
          this.router.navigate(['/']).then();

          this.user = resp.user;
          sessionStorage.setItem('_user', JSON.stringify(dataUs));
        },
        err => {
          (<any>window).sentMessageError.init("não foi autorizado a conectar se no sistema")
          this.router.navigate(['/auth/sign-in']).then();
        }
      )

    } catch (e) {
      (<any>window).sentMessageError.init("não foi autorizado a conectar se no sistema")
    }
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

    try {
      await this.serviceU.validateExiste(this.user.email, 'email',
        false, this.window.$('#devolucaoProduct'), false, "", true, true)


      await setTimeout(() => {
        try {
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
                    this.createCont(as).then()
                  }

                } else {
                  this.router.navigate(['/auth/sign-in']).then();
                  (<any>window).sentMessageError.init("não foi autorizado a conectar se no sistema")
                }
              } catch (error) {
                console.log(error);
                (<any>window).sentMessageError.init("não foi autorizado a conectar se no sistema")
              }
            })
        } catch (e) {
          (<any>window).sentMessageError.init("não foi autorizado a conectar se no sistema")
        }

      }, 2000)
    } catch (e) {
      (<any>window).sentMessageError.init("não foi autorizado a conectar se no sistema")
    }

  }


  private getUser(_token: string): any {
    return JSON.parse(atob(_token.split('.')[1]))
  }

  async signInGoogleProviderTo(users: any) {
    try {
      await this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(
        async resp => {
          this.user = resp.user;
          this.createCont(users).then()

        },
        err => {
          (<any>window).sentMessageError.init("não foi autorizado a conectar se no sistema")
        }
      );
    } catch (e) {
    }


  }

  private async createCont(users: any) {
    try {
      let modeUse: any = {};

      modeUse = users;
      modeUse.photo = this.user.photoURL;
      modeUse.email = this.user.email;
      modeUse.id = this.user.email;
      modeUse.timestamp = new Date().getTime();


      await this.fs.collection('/users').doc(modeUse.id).set(modeUse);
    } catch (e) {
      (<any>window).sentMessageError.init("não foi autorizado a conectar se no sistema")
    }
  }


}


