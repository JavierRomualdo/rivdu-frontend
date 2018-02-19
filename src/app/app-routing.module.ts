import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './servicios/auth-guard.service';

import { LoginComponent } from './login/login.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppComponent } from './app.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: '/welcome/empresa',
        pathMatch: 'full'
      },
      {
        path: 'empresa', // la ruta real es movimientos/nuevo
        component: EmpresaComponent
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
