import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {StorageValidateAnyService} from "../../../shared/storage.validate.any.service";
import {StorageService} from "../../../shared/storage.service";

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

  constructor(private auth: AuthService, private store: StorageService) {
    this.validateAny = new StorageValidateAnyService(this.store, 'users')
  }

  ngOnInit(): void {
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
      false, this.window.$('#devolucaoProduct'), false, "", true, true)
  }

  private resetAttributes() {
    this.email = ""
    this.password = ""
  }
}
