import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { RestApi } from './rest-api';
import { UserCardComponent } from './user-card/user-card.component';
import { UserEditComponent } from './user-list/user-edit/user-edit.component';
import { AppRoutingModule, RoutesComponents } from './app.routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataService, CustomInterceptor } from './restApi';
import { Configuration } from './apiConfiguration';
import { SlimLoadingBarService, SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ToastrService, ToastrModule } from 'toastr-ng2';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserCardComponent,
    UserEditComponent,
    RoutesComponents,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    SlimLoadingBarModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    RestApi,
    DataService,
    Configuration,
    SlimLoadingBarService,
    ToastrService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
