import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ApiRequestService } from '../servicios/api-request.service';
import { Usuario } from '../entidades/entidad.usuario';
import { ToastrService } from 'ngx-toastr';
import { Md5 } from 'ts-md5';

const TITULOS: string[] = ["Información básica", "Edición"];
interface INewPassword {
  antiguaPassword: string,
  nuevaPassword: string,
  confirmarNuevaPassword: string;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  titulo: string = TITULOS[0];
  isEdicion: boolean = false;
  cargando: boolean = false;
  isAntiguaPasswordValido: boolean = false;
  isNuevaPasswordValido: boolean = false;
  public usuario: Usuario;
  public password: INewPassword;

  constructor(public api: ApiRequestService,
    public authService: AuthService,
    public toastr: ToastrService) {
  }

  ngOnInit() {
    this.password = { antiguaPassword: "", nuevaPassword: "", confirmarNuevaPassword: "" };
    this.traerUsuario();
  }

  traerUsuario() {
    this.cargando = true;
    this.api.get("usuario/show/" + this.authService.getUserName())
      .then(respuesta => {
        if (respuesta && respuesta.extraInfo) {
          this.usuario = respuesta.extraInfo;
          this.cargando = false;
        } else {
          this.toastr.error(respuesta.operacionMensaje, 'Error');
        } this.cargando = false;
      })
      .catch(err => this.handleError(err));
  }

  actualizarUsuario() {
    this.cargando = true;
    let antiguaPassword = Md5.hashStr(this.password.antiguaPassword);
    let nuevaPassword = Md5.hashStr(this.password.nuevaPassword);
    if (this.password.antiguaPassword && this.password.nuevaPassword) {
      this.api.get(`usuario/validarPassword/${this.authService.getUserName()}/${antiguaPassword}`)
        .then(respuesta => {
          if (respuesta && respuesta.extraInfo) {
            this.actualizar(nuevaPassword);
          }
          else if (respuesta && !respuesta.extraInfo) {
            this.toastr.warning(respuesta.operacionMensaje, 'Error');
          }
          else {
            this.toastr.error(respuesta.operacionMensaje, 'Error');
          }
          this.cargando = false;
        }).catch(err => this.handleError(err));
    } else {
      this.actualizar("");
    }
  }

  actualizar(nuevaPassword) {
    let usuarioEdicionDTO = {
      "usuario": this.usuario,
      "password": "" + nuevaPassword
    }
    this.api.put("usuario/", usuarioEdicionDTO)
      .then(respuesta => {
        if (respuesta) {
          this.authService.setNombrecompleto(this.usuario.nombre, this.usuario.apellidos);
          this.toastr.success(respuesta.operacionMensaje, 'Éxito');
          this.habilitarEdicion();
        } else {
          this.toastr.error(respuesta.operacionMensaje, 'Error');
        } this.cargando = false;
      })
      .catch(err => this.handleError(err));
  }

  habilitarEdicion() {
    this.isEdicion = !this.isEdicion;
    this.titulo = this.isEdicion ? TITULOS[1] : TITULOS[0];
  }

  verificarPassword() {
    this.isAntiguaPasswordValido = (this.password.antiguaPassword.length > 0);
    this.isNuevaPasswordValido = (this.isAntiguaPasswordValido && this.password.nuevaPassword === this.password.confirmarNuevaPassword);
    if (this.password.antiguaPassword.length <= 0) {
      this.password.nuevaPassword = "";
      this.password.confirmarNuevaPassword = "";
    }
  }

  private handleError(error: any): void {
    this.cargando = false;
    this.toastr.error("Error Interno", 'Error');
  }

}
