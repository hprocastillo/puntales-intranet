import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {

    this.formLogin = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  async onSubmit() {
    try {
      await this.authService.login(this.formLogin.value);
      await this.router.navigate(['/home']);

    } catch (e) {
      console.log(e);
    }
  }

}
