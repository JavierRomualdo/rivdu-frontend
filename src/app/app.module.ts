import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { AppRouterModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmpresaComponent } from './empresa/empresa.component';

import { ApiRequestService } from './servicios/api-request.service';
import { AuthService } from './servicios/auth.service';
import { HomeService } from './servicios/home.service';
import { AuthGuardService } from './servicios/auth-guard.service';
import { AppConfig } from './app-config';
import { WelcomeComponent } from './welcome/welcome.component';
import { ModalEmpresaComponent } from './empresa/modal-empresa/modal-empresa.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmpresaComponent,
    WelcomeComponent,
    ModalEmpresaComponent
  ],
  entryComponents: [
    ModalEmpresaComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRouterModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AppConfig,
    AuthService,
    HomeService,
    ApiRequestService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
