import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from "@angular/router";
import {GoogleAuthProvider} from "@angular/fire/auth"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) {  }

  // Sign In method
  signIn(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/']).then();
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
  signInGoogleProvider(){
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then(
      resp =>{
        this.router.navigate(['/']).then()
        localStorage.setItem('token', JSON.stringify(resp.user?.uid))
      },
      err =>{
          console.log(err.message)
      }
    );
  }

}
