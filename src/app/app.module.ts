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
import { ModalProgramasComponent } from './empresa/modal-programas/modal-programas.component';
import { ModalIngenierosComponent } from './empresa/modal-ingenieros/modal-ingenieros.component';
import { ModalSucursalesComponent } from './empresa/modal-sucursales/modal-sucursales.component';
import { ModalApoderadosComponent } from './empresa/modal-apoderados/modal-apoderados.component';
import { MantenimientoCaptacionComponent } from './mantenimiento-captacion/mantenimiento-captacion.component';
import { MantenimientoConstruccionComponent } from './mantenimiento-construccion/mantenimiento-construccion.component';
import { MantenimientoTesoreriaComponent } from './mantenimiento-tesoreria/mantenimiento-tesoreria.component';
import { ModalUbigeoComponent } from './mantenimiento-captacion/modal-ubigeo/modal-ubigeo.component';
import { ModalDescuentosComponent } from './mantenimiento-captacion/modal-descuentos/modal-descuentos.component';
import { ModalEstadocivilComponent } from './mantenimiento-captacion/modal-estadocivil/modal-estadocivil.component';
import { ModalRelacionpersonalComponent } from './mantenimiento-captacion/modal-relacionpersonal/modal-relacionpersonal.component';
import { ModalCaptadorComponent } from './mantenimiento-captacion/modal-captador/modal-captador.component';
import { ModalMaterialesComponent } from './mantenimiento-construccion/modal-materiales/modal-materiales.component';
import { ModalLaboresComponent } from './mantenimiento-construccion/modal-labores/modal-labores.component';
import { ModalResponsablesComponent } from './mantenimiento-construccion/modal-responsables/modal-responsables.component';
import { ModalProveedoresComponent } from './mantenimiento-construccion/modal-proveedores/modal-proveedores.component';
import { ModalBancosComponent } from './mantenimiento-tesoreria/modal-bancos/modal-bancos.component';
import { ModalCostosComponent } from './mantenimiento-tesoreria/modal-costos/modal-costos.component';
import { ModalCuentasComponent } from './mantenimiento-tesoreria/modal-cuentas/modal-cuentas.component';
import { CargandoComponent } from './util/cargando/cargando.component';
import { ConfirmacionComponent } from './util/confirmacion/confirmacion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmpresaComponent,
    WelcomeComponent,
    ModalEmpresaComponent,
    ModalProgramasComponent,
    ModalIngenierosComponent,
    ModalSucursalesComponent,
    ModalApoderadosComponent,
    MantenimientoCaptacionComponent,
    MantenimientoConstruccionComponent,
    MantenimientoTesoreriaComponent,
    ModalUbigeoComponent,
    ModalDescuentosComponent,
    ModalEstadocivilComponent,
    ModalRelacionpersonalComponent,
    ModalCaptadorComponent,
    ModalMaterialesComponent,
    ModalLaboresComponent,
    ModalResponsablesComponent,
    ModalProveedoresComponent,
    ModalBancosComponent,
    ModalCostosComponent,
    ModalCuentasComponent,
    CargandoComponent,
    ConfirmacionComponent
  ],
  entryComponents: [
    ModalEmpresaComponent,
    ModalProgramasComponent,
    ModalIngenierosComponent,
    ModalSucursalesComponent,
    ModalApoderadosComponent,
    ModalUbigeoComponent,
    ModalDescuentosComponent,
    ModalEstadocivilComponent,
    ModalRelacionpersonalComponent,
    ModalCaptadorComponent,
    ModalMaterialesComponent,
    ModalLaboresComponent,
    ModalResponsablesComponent,
    ModalProveedoresComponent,
    ModalBancosComponent,
    ModalCostosComponent,
    ModalCuentasComponent,
      ConfirmacionComponent
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
