import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../service/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hide = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthorizationService
  ) {}

  loginForm = this.formBuilder.group({
    email: new FormControl<string | null>('john@mail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>('changeme', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  getLoginFormControls(controlName: string) {
    return this.loginForm.get(controlName);
  }

  toLogin() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.authenticateUser(email, password).subscribe((res) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        this.router.navigate(['/all-products']);
        localStorage.setItem('isAdmin', JSON.stringify(false));
      });
    }
  }
}
