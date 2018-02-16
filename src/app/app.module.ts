import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { AppRouterModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmpresaComponent } from './empresa/empresa.component';

import { ApiRequestService } from './servicios/api-request.service';
import { AuthService } from './servicios/auth.service';
import { HomeService } from './servicios/home.service';
import { AppConfig } from './app-config';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    AppConfig,
    AuthService,
    HomeService,
    ApiRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
