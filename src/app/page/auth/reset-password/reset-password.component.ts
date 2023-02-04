import {Component} from '@angular/core';
import {AuthService} from "../../../shared/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {


  email: string = ""

  constructor(private auth: AuthService) {
  }

  async enviar() {
    if (!this.email)
      throw "infroduza um email"

    await this.auth.resetPass(this.email);
  }
}
