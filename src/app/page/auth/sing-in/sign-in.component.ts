import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";

@Component({
  selector: 'app-sing-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  email: string = ""
  password: string = ""

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
  }

  /**
   * this is method sign in to application Global Tronic Armazem
   */
  signIn(): void {
    this.auth.signIn(this.email, this.password)
    this.resetAttributes()
  }


  signInWithGoogle() {
    this.auth.signInGoogleProvider()
  }

  validate() {

  }

  private resetAttributes() {
    this.email = ""
    this.password = ""
  }
}
