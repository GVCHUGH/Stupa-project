import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { ErrorInterceptor } from './error_interceptor';
import { BaseHttpInterceptor } from './http_interceptor';
import { HttpResponseInterceptor } from './response_interceptor';

export const allHttpInterceptorProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: BaseHttpInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpResponseInterceptor,
    multi: true,
  },
];
