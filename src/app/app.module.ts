import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
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
import { ModalEspecificacionesComponent } from './mantenimiento-captacion/modal-especificaciones/modal-especificaciones.component';
import { ModalEstadocivilComponent } from './mantenimiento-captacion/modal-estadocivil/modal-estadocivil.component';
import { ModalRelacionpersonalComponent } from './mantenimiento-captacion/modal-relacionpersonal/modal-relacionpersonal.component';
import { ModalMaterialesComponent } from './mantenimiento-construccion/modal-materiales/modal-materiales.component';
import { ModalLaboresComponent } from './mantenimiento-construccion/modal-labores/modal-labores.component';
import { ModalBancosComponent } from './mantenimiento-tesoreria/modal-bancos/modal-bancos.component';
import { ModalCostosComponent } from './mantenimiento-tesoreria/modal-costos/modal-costos.component';
import { ModalCuentasComponent } from './mantenimiento-tesoreria/modal-cuentas/modal-cuentas.component';
import { ModalGerenteComponent } from './empresa/modal-gerente/modal-gerente.component';
import { CaptacionesComprasComponent } from './captaciones-compras/captaciones-compras.component';
import { CaptacionesProyectosComponent } from './captaciones-proyectos/captaciones-proyectos.component';
import { CaptacionesVentasComponent } from './captaciones-ventas/captaciones-ventas.component';
import { CargandoComponent } from './util/cargando/cargando.component';
import { MomentModule } from 'angular2-moment';
import { ConfirmacionComponent } from './util/confirmacion/confirmacion.component';
import { ModalCompraformularioComponent } from './captaciones-compras/modal-compraformulario/modal-compraformulario.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ModalRolComponent } from './empresa/modal-rol/modal-rol.component';
import { ModalVentaformularioComponent } from './captaciones-ventas/modal-ventaformulario/modal-ventaformulario.component';
import { ModalPreciosComponent } from './modal-precios/modal-precios.component';
import { CaptacionesExpedientesComponent } from './captaciones-expedientes/captaciones-expedientes.component';

import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';
import {ContextMenuModule} from 'primeng/contextmenu';
import {TreeNode} from 'primeng/api';
import {NodeService} from './servicios/node.service';
import {PaginatorModule} from 'primeng/paginator';
import {TreeModule} from 'primeng/tree';

import { ExpedientesComprasComponent } from './captaciones-expedientes/expedientes-compras/expedientes-compras.component';
import { ExpedientesProyectosComponent } from './captaciones-expedientes/expedientes-proyectos/expedientes-proyectos.component';
import { ExpedientesVentasComponent } from './captaciones-expedientes/expedientes-ventas/expedientes-ventas.component';

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
    ModalEspecificacionesComponent,
    ModalEstadocivilComponent,
    ModalRelacionpersonalComponent,
    ModalMaterialesComponent,
    ModalLaboresComponent,
    ModalBancosComponent,
    ModalCostosComponent,
    ModalCuentasComponent,
    ModalGerenteComponent,
    CargandoComponent,
    ConfirmacionComponent,
    CaptacionesComprasComponent,
    CaptacionesProyectosComponent,
    CaptacionesVentasComponent,
    CargandoComponent,
    ModalCompraformularioComponent,
    ModalRolComponent,
    ModalVentaformularioComponent,
    ModalPreciosComponent,
    CaptacionesExpedientesComponent,
    ExpedientesComprasComponent,
    ExpedientesProyectosComponent,
    ExpedientesVentasComponent
  ],
  entryComponents: [
    ModalEmpresaComponent,
    ModalProgramasComponent,
    ModalIngenierosComponent,
    ModalSucursalesComponent,
    ModalApoderadosComponent,
    ModalUbigeoComponent,
    ModalEspecificacionesComponent,
    ModalEstadocivilComponent,
    ModalRelacionpersonalComponent,
    ModalMaterialesComponent,
    ModalLaboresComponent,
    ModalBancosComponent,
    ModalCostosComponent,
    ModalCuentasComponent,
    ModalGerenteComponent,
    ConfirmacionComponent,
    ModalCompraformularioComponent,
    ModalVentaformularioComponent,
    ModalPreciosComponent,
    ModalRolComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRouterModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MomentModule,
    UiSwitchModule,
    SidebarModule,
    ButtonModule,
    DialogModule,
    TableModule,
    TreeTableModule,
    ContextMenuModule,
    PaginatorModule,
    TreeModule
  ],
  providers: [
    AppConfig,
    AuthService,
    HomeService,
    HttpClient,
    ApiRequestService,
    AuthGuardService,
    NgbActiveModal,
    NodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
