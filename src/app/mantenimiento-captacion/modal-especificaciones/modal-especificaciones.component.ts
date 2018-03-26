import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Especificaciones } from '../../entidades/entidad.especificaciones';
import {AuthService }  from '../../servicios/auth.service';
import { Estructura } from '../../entidades/entidad.estructura';
import {ApiRequestService} from '../../servicios/api-request.service';
import { ConfirmacionComponent } from '../../util/confirmacion/confirmacion.component';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-especificaciones',
  templateUrl: './modal-especificaciones.component.html',
  styleUrls: ['./modal-especificaciones.component.css']
})
export class ModalEspecificacionesComponent implements OnInit {


  public cargando:boolean= false;
  public vistaFormulario = false;
  public especificaciones:Especificaciones[];
  public especificacion:Especificaciones;
  public estructura:Estructura;
  public  lista:any=[];
  public verNuevo:boolean = false;
  public confirmarcambioestado:boolean = false;


  constructor(
      public activeModal: NgbActiveModal,
      public toastr: ToastrService,
      private modalService: NgbModal,
      public apiRequest: ApiRequestService,
      public auth: AuthService,
      public modal: NgbModal,
      public api: ApiRequestService

  ) {
    this.especificacion=new Especificaciones();
    this.estructura =new Estructura();
    this.especificacion.idestructura = new Estructura();
  }

  ngOnInit() {
    this.listarEspecificaciones();
    this.listarEstructura();
  }

  confirmarcambiodeestado(especificacion):void{
    const modalRef = this.modalService.open(ConfirmacionComponent,{windowClass:'nuevo-modal'});
    modalRef.result.then((result) => {
      this.confirmarcambioestado=true;
      this.cambiarestadoEspec(especificacion);
      this.auth.agregarmodalopenclass();
    }, (reason) => {
      especificacion.estado = !especificacion.estado;
      this.auth.agregarmodalopenclass();
    });
  };

  cambiarestadoEspec(especificacion){
    this.cargando = true;
    return this.apiRequest.post('especificaciones/eliminar', {id:especificacion.id})
        .then(
            data => {
              if(data && data.extraInfo){
                this.toastr.success(data.operacionMensaje," Exito");
                this.listarEspecificaciones();
              } else {
                this.toastr.info(data.operacionMensaje,"Informacion");
              }
              this.cargando = false;
            }
        )
        .catch(err => this.handleError(err));
  };

  listarEspecificaciones(){
    this.cargando=true;
    this.api.get("especificaciones/listar")
        .then(respuesta => {
          if(respuesta && respuesta.extraInfo){
            this.especificaciones = respuesta.extraInfo;
            this.cargando=false;
          } else {
            this.toastr.error(respuesta.operacionMensaje, 'Error');
          }
        })
        .catch(err => this.handleError(err));

  };

  listarEstructura(){
      this.api.get("estructura/listar")
          .then(respuesta => {
              if(respuesta && respuesta.extraInfo){
                  this.lista = respuesta.extraInfo;
              } else {
                  this.toastr.error(respuesta.operacionMensaje, 'Error');
              }
          })
          .catch(err => this.handleError(err));
  };

  nuevo(){
    this.vistaFormulario = true;
    this.cargando = true;
    this.verNuevo = false;
    this.especificacion = new Especificaciones();
    this.cargando = false;
  };

  guardarEspecificaciones(){
    this.cargando= true;
    if(this.especificacion.id){
      return this.apiRequest.put('especificaciones', this.especificacion)
          .then(
              data => {
                if(data && data.extraInfo){
                  this.cargando = false;
                  this.vistaFormulario = false;
                  this.especificacion = data.extraInfo;
                  let producto = this.especificaciones.find(item => item.id === this.especificacion.id);
                  let index = this.especificaciones.indexOf(producto);
                  this.especificaciones[index] = this.especificacion;
                  this.especificacion = new Especificaciones();
                }else{
                  this.toastr.info(data.operacionMensaje,"Informacion");
                  this.cargando = false;
                }
              }
          )
          .catch(err => this.handleError(err));
    } else {
      return this.apiRequest.post('especificaciones', this.especificacion)
          .then(
              data => {
                if(data && data.extraInfo){
                  this.cargando = false;
                  this.especificaciones.push(data.extraInfo);
                  this.vistaFormulario = false;
                  this.especificacion =new Especificaciones();
                }
                else{
                  this.toastr.info(data.operacionMensaje,"Informacion");
                  this.cargando = false;
                }
              }
          )
          .catch(err => this.handleError(err));
    }
  };

  traerParaEdicion(id){
      this.cargando = true;
      this.vistaFormulario = true;
      this.verNuevo=true;
      return this.apiRequest.post('especificaciones/obtener', {id:id})
          .then(
              data => {
                  if(data && data.extraInfo){
                      this.cargando = false;
                      this.especificacion = data.extraInfo;
                      this.llenarCombo(this.especificacion);
                  }
                  else{
                      this.toastr.info(data.operacionMensaje,"Informacion");
                      this.vistaFormulario = false;
                      this.cargando = false;
                  }
              }
          )
          .catch(err => this.handleError(err));
  };

  llenarCombo(especificacion){
      let tipo= especificacion.idestructura;
      let tiposelect = this.lista.find(item => item.id == tipo.id);
      this.especificacion.idestructura = tiposelect;
  };

  validarValor(){
      if(this.especificacion.valorm2<0){
          this.especificacion.valorm2 = 0;
      }
  }
    elegirEspecificacion(o){
        this.activeModal.close(o);
    };
  private handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
    this.cargando =false;
  };
}
