import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpInterceptor implements HttpInterceptor {
  constructor(@Inject('BASE_API_URL') private baseUrl: string) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const access_token = localStorage.getItem('access_token');

    // If no token is found, forward the request as it is
    if (!access_token) {
      return next.handle(req);
    }

    // Clone request and add the Authorization header only if it's not already present
    const apiReq = req.clone({
      setHeaders: {
        Authorization: req.headers.has('Authorization')
          ? req.headers.get('Authorization')!
          : `Bearer ${access_token}`,
      },
    });

    return next.handle(apiReq);
  }
}
