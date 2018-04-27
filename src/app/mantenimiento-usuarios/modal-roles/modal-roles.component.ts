import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiRequestService} from '../../servicios/api-request.service';
import {AuthService} from '../../servicios/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Rol}from '../../entidades/entidad.rol';
import {ConfirmacionComponent} from '../../util/confirmacion/confirmacion.component'


@Component({
  selector: 'app-modal-roles',
  templateUrl: './modal-roles.component.html',
  styleUrls: ['./modal-roles.component.css']
})
export class ModalRolesComponent implements OnInit {

  public rol:Rol;
  public lista:any=[];
  public confirmarcambioRol= false;
  public cargando:boolean=false;
  public vistaFormulario:boolean=false;
  public listado:boolean=false;
  public id:number;

  constructor(
      public activeModal: NgbActiveModal,
      public api: ApiRequestService,
      public apiRequest: ApiRequestService,
      public auth: AuthService,
      public toastr: ToastrService,
      public modal: NgbModal
  ) {
    this.rol= new Rol();
  }

  ngOnInit() {
    this.listarRoles();
  }

  confirmarcambiodeRol(rol){
    const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
    modalRef.result.then((result) => {
      this.cambiarRol(rol);
      this.auth.agregarmodalopenclass();
    }, (reason) => {
      rol.estado = !rol.estado;
      this.auth.agregarmodalopenclass();
    });
  };

  cambiarRol(rol){
    this.cargando = true;
    return this.apiRequest.get('tiposroles/inhabilitarrol/'+rol.id)
        .then(
            data => {
              if(data && data.extraInfo){
                this.toastr.success(data.operacionMensaje," Exito");
                this.listarRoles();
              } else {
                this.toastr.info(data.operacionMensaje,"Informacion");
              }
              this.cargando = false;
            }
        )
        .catch(err => this.handleError(err));

  };

  traerParaEdicion(id){
    this.vistaFormulario = true;
    return this.api.post('tiposroles/obtener', {id: id})
        .then(
            data => {
              if(data && data.extraInfo){
                this.rol = data.extraInfo;
              } else {
                this.toastr.info(data.operacionMensaje,"Informacion");
              }
            }
        )
        .catch(err => this.handleError(err));
  };

  listarRoles(){
    this.cargando=true;
    this.api.get("tiposroles/listar")
        .then(respuesta => {
          if(respuesta && respuesta.extraInfo){
            this.lista = respuesta.extraInfo;
            this.cargando=false;
          } else {
            this.toastr.error(respuesta.operacionMensaje, 'Error');
            this.cargando = false;
          }
        })
        .catch(err => this.handleError(err));

  };

  guardarRol(){
    this.cargando=true;
    this.api.post("tiposroles",this.rol)
        .then(respuesta => {
          if(respuesta && respuesta.extraInfo){
            this.rol = respuesta.extraInfo;
            this.toastr.success("Registro guardado exitosamente", 'Exito');
            this.cargando = false;
            this.listado = true;
            this.listarRoles();
            this.vistaFormulario = false;
          } else {
            this.cargando=false;
            this.toastr.error(respuesta.operacionMensaje, 'Error');
          }
        })
        .catch(err => this.handleError(err));
  };

  abrinuevoRol(){
    this.vistaFormulario = true;
    this.rol=new Rol();
  };

  private handleError(err:any):any {
    this.cargando = false;
    this.toastr.error("Error Interno", 'Error');
  }
}
