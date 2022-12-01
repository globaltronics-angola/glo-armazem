import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";

@Component({
  selector: 'app-sing-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email: string = ""
  password: string = ""
  passwordConfirm: string = ""

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
  }

  signUp(): void {
    this.auth.signUp(this.email, this.password);
    this.resetAttributes();
  }

  private resetAttributes() {
    this.email = ""
    this.password = ""
    this.passwordConfirm = ""
  }
}
