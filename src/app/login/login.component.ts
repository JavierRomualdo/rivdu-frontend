import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ApiRequestService } from '../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cargando:boolean=false;
  user: any = {};

  constructor(
    public apiService: ApiRequestService,
    public authService: AuthService,
    public toastr: ToastrService,
    public router: Router,
  ) { }

  ngOnInit() {
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
          this.router.navigate(['']);
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
          }
          this.cargando = false;
        }
      );
  }

}
