import { Component } from '@angular/core';
import { AuthorizationService } from '../../../modules/auth/service/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) {
    this.isAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'false');
  }

  isAdmin = false;

  toLogout() {
    this.authService.logoutUser();
  }

  toChangeUser(user: any) {
    if (user == 'Admin') {
      this.isAdmin = true;
      this.router.navigate(['/products']);
      localStorage.setItem('isAdmin', JSON.stringify(this.isAdmin));
    } else {
      this.isAdmin = false;
      this.router.navigate(['/all-products']);
      localStorage.setItem('isAdmin', JSON.stringify(this.isAdmin));
    }
  }
  toCustomer() {
    this.isAdmin = true;
    this.router.navigate(['/products']);
  }
}
