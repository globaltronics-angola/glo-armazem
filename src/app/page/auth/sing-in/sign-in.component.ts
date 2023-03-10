import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {StorageValidateAnyService} from "../../../shared/storage.validate.any.service";
import {StorageService} from "../../../shared/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sing-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  email: string = ""
  password: string = ""
  private validateAny: StorageValidateAnyService;
  window: any = (<any>window);
  typeElement: string = "password";

  constructor(private router: Router, private auth: AuthService, private store: StorageService ) {
    this.validateAny = new StorageValidateAnyService(this.store, 'users')

  }

  ngOnInit(): void {
    if (this.auth.user){
     this.auth.callRouter()
    }
  }

  /**
   * this is method sign in to application Global Tronic Armazem
   */
  async signIn() {
    await this.validate();

    await this.auth.signIn(this.email, this.password)
    ///await this.resetAttributes()
  }


  async signInWithGoogle() {
    await this.auth.signInGoogleProvider()
  }

  async validate() {
    await this.validateAny.validateExiste(this.email, 'email',
      false, this.window.$('#email'), false, "", false, false)


    await this.validateAny.validateExiste(this.password, 'password',
      false, this.window.$('#password'), false, "", false, false)
  }

  private resetAttributes() {
    this.email = ""
    this.password = ""
  }

  prevElementType() {
    if (this.typeElement == 'password')
      return this.typeElement = 'text';

    return this.typeElement = 'password'
  }
}
