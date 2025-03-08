import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseData } from '../model/login-response.model';
import { shareReplay, tap } from 'rxjs';
import { apiEndpoints } from '../../../core/api-endpoints/api-endpoints';
import moment from 'moment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  logoutUser() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token'); // Check if token exists
  }

  authenticateUser(email: string, password: string) {
    return this.httpClient
      .post<LoginResponseData>(apiEndpoints.login, {
        email,
        password,
      })
      .pipe(
        tap((res: any) => console.log(res)),
        tap((data: any) => this.setSession(data)),
        shareReplay()
      );
  }

  private setSession(tokenData?: any) {
    console.log(tokenData);
    // if (tokenData && tokenData.access_token) {
    //   localStorage.setItem('access_token', tokenData.access_token);
    //   localStorage.setItem('refresh_token', tokenData.refresh_token);
    // }
  }

  public getTokenIfNotExpired() {
    return !this.isTokenNotExpired
      ? undefined
      : localStorage.getItem('refresh_token');
  }

  private get isTokenNotExpired() {
    return moment().utc().isBefore(this.getExpiration());
  }

  private getExpiration() {
    const expiration = localStorage.getItem('refresh_token_expires_at');
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment.unix(expiresAt);
    }
    return null;
  }
}
