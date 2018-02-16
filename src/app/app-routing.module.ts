import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { AppComponent } from './app.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', component: EmpresaComponent },
	{ path: '', redirectTo: '/', pathMatch: 'full' }
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
