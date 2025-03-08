import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CoreModule } from './core/core.module';
import { AdminModule } from './modules/admin/admin.module';
import { CustomerModule } from './modules/customer/customer.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { allHttpInterceptorProviders } from './core/interceptor/interceptor';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

function getBaseUrl() {
  return environment.API_URL;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AdminModule,
    CustomerModule,
    AuthModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
      progressAnimation: 'decreasing',
    }),
    NgxUiLoaderModule.forRoot({
      fgsColor: '#fff',
      text: 'Please wait, data should be displayed shortly',
      textColor: '#fff',
      textPosition: 'center-center',
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: 'BASE_API_URL',
      useFactory: getBaseUrl,
      deps: [],
    },
    ...allHttpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
