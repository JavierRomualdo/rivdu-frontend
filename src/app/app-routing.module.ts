import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './servicios/auth-guard.service';

import { LoginComponent } from './login/login.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { MantenimientoCaptacionComponent } from './mantenimiento-captacion/mantenimiento-captacion.component';
import { MantenimientoConstruccionComponent } from './mantenimiento-construccion/mantenimiento-construccion.component';
import { MantenimientoTesoreriaComponent } from './mantenimiento-tesoreria/mantenimiento-tesoreria.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppComponent } from './app.component';
import {CaptacionesComprasComponent} from './captaciones-compras/captaciones-compras.component';
import { CaptacionesVentasComponent } from './captaciones-ventas/captaciones-ventas.component';
import { CaptacionesExpedientesComponent } from './captaciones-expedientes/captaciones-expedientes.component';
import { ExpedientesComprasComponent } from './captaciones-expedientes/expedientes-compras/expedientes-compras.component';
import { ExpedientesProyectosComponent } from './captaciones-expedientes/expedientes-proyectos/expedientes-proyectos.component';
import { ExpedientesVentasComponent } from './captaciones-expedientes/expedientes-ventas/expedientes-ventas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'empresa', // la ruta real es movimientos/nuevo
        component: EmpresaComponent
      },
      {
        path: '',
        redirectTo: '/welcome/empresa',
        pathMatch: 'full'
      },
      {
        path: 'mantcapt', // la ruta real es movimientos/nuevo
        component: MantenimientoCaptacionComponent
      },
      {
        path: 'mantconst', // la ruta real es movimientos/nuevo
        component: MantenimientoConstruccionComponent
      },
      {
        path: 'mantteso', // la ruta real es movimientos/nuevo
        component: MantenimientoTesoreriaComponent
      },
      {
        path: 'captcomp',
        component: CaptacionesComprasComponent
      },
      {
        path: 'captvent',
        component: CaptacionesVentasComponent
      },
      {
        path: 'captexpe',
        component: CaptacionesExpedientesComponent,
        children: [
          {
            path: 'compras', // la ruta real es movimientos/nuevo
            component: ExpedientesComprasComponent
          },
          {
            path: '',
            redirectTo: '/welcome/captexpe',
            pathMatch: 'full'
          },
          {
            path: 'ventas', // la ruta real es movimientos/nuevo
            component: ExpedientesVentasComponent
          },
          {
            path: 'proyectos', // la ruta real es movimientos/nuevo
            component: ExpedientesProyectosComponent
          }
        ]
      }
    ]
  },
  { path: '', redirectTo: '/welcome/empresa', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        useHash : true
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRouterModule { }
