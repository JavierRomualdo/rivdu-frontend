import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ApiRequestService } from '../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LS } from '../app-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cargando:boolean=false;
  user: any = {};
  ruc:string;
  empresaIsTrue:boolean=false;

  constructor(
    public apiService: ApiRequestService,
    public authService: AuthService,
    public toastr: ToastrService,
    public router: Router
  ) { }

  ngOnInit() {
    localStorage.clear();
  }

  consultarEmpresa(){
    this.cargando = true;
    this.apiService.get("empresa/validar/"+this.ruc)
      .then(respuesta => {
        if(respuesta && respuesta.extraInfo){
          this.toastr.success(respuesta.operacionMensaje, 'Exito');
          localStorage.setItem(LS.KEY_ID_EMPRESA, respuesta.extraInfo.id);
          localStorage.setItem(LS.KEY_RUC_EMPRESA, respuesta.extraInfo.ruc);
          this.empresaIsTrue = true;
          this.cargando= false;
        }else{
          this.toastr.error(respuesta.operacionMensaje, 'Error');
          this.cargando=false;
        }
      })
      .catch(err => this.handleError(err));
  }

  private handleError(error: any): void {
    this.cargando = false;
    this.toastr.error("Error Interno", 'Error');
  }

  ingresar() {
    this.cargando = true;
    this.authService.ingresar(this.user.username, this.user.password)
      .then(
        resp => {
          if (resp.user === undefined || resp.user.userId === undefined || resp.user.token === "INVALID") {
            this.toastr.error('Usuario o clave incorrecta', 'Error');
            this.authService.cerrarSession();
            this.cargando = false;
            return;
          }
          this.cargando = false;
          this.armarMenu();
          this.router.navigate(['/welcome']);
        },
        errResponse => {
          this.authService.cerrarSession();
          switch (errResponse.status) {
            case 401:
            case 403:
              this.toastr.error('Usuario o clave incorrecta', 'Error');
              break;
            default:
              this.toastr.error('Error interno', 'Error');
              break;
          }
          this.cargando = false;
        }
      );
  }

  armarMenu(){
    this.apiService.get("menu/traer/"+this.authService.getUserName())
      .then(respuesta => {
        if(respuesta && respuesta.extraInfo){
          localStorage.setItem(LS.KEY_MENUS,JSON.stringify(respuesta.extraInfo));
        }else{
          this.toastr.error(respuesta.operacionMensaje, 'Error');
        }
      })
      .catch(err => this.handleError(err));
  }

}
