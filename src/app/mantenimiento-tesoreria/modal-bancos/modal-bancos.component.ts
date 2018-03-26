import { Component, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../servicios/auth.service';
import {ApiRequestService} from '../../servicios/api-request.service';
import { Cuentabanco } from '../../entidades/entidad.cuentabanco';
import {ConfirmacionComponent} from '../../util/confirmacion/confirmacion.component';


@Component({
  selector: 'app-modal-bancos',
  templateUrl: './modal-bancos.component.html',
  styleUrls: ['./modal-bancos.component.css']
})
export class ModalBancosComponent implements OnInit {

  public cargando:boolean = false;
  public banco:Cuentabanco;
  public  lista:any=[];
  public listado:boolean=false;
  public vistaFormulario:boolean = false;
  public verNuevo:boolean = false;
  public bancos:Cuentabanco[];
  public confirmarestadoBanco:boolean =false;
  constructor(
      public activeModal: NgbActiveModal,
      private modalService: NgbModal,
      public api: ApiRequestService,
      public apiRequest: ApiRequestService,
      public toastr: ToastrService,
      private modal:NgbModal,
      public auth: AuthService
  ) {
    this.banco= new Cuentabanco();

  }

  ngOnInit() {
    this.listarCuentas();
  }

  nuevo(){
    this.vistaFormulario=true;
    this.cargando=true;
    this.verNuevo = false;
    this.banco =new Cuentabanco();
    this.cargando= false;
  };

  confirmarcambiodeestado(banco){
    const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
    modalRef.result.then((result) => {
      this.confirmarestadoBanco=true;
      this.cambiarestadoBanco(banco);
      this.auth.agregarmodalopenclass();
    }, (reason) => {
      banco.estado = !banco.estado;
      this.auth.agregarmodalopenclass();
    });
  };

  cambiarestadoBanco(banco){
    this.cargando = true;
    return this.apiRequest.get('cuentabanco/eliminarestadocliente/'+banco.id)
        .then(
            data => {
              if(data && data.extraInfo){
                this.toastr.success(data.operacionMensaje," Exito");
                this.listarCuentas();
              } else {
                this.toastr.info(data.operacionMensaje,"Informacion");
              }
              this.cargando = false;
            }
        )
        .catch(err => this.handleError(err));
  }

  listarCuentas(){
    this.cargando=true;
    this.api.get("cuentabanco/listar")
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

  traerParaEdicion(id){
      this.cargando = true;
      this.vistaFormulario = true;
      this.verNuevo=true;
    return this.api.post('cuentabanco/obtener', {id: id})
        .then(
            data => {
              if(data && data.extraInfo){
                this.cargando = false;
                this.banco = data.extraInfo;
              } else {
                this.toastr.info(data.operacionMensaje,"Informacion");
              }
            }
        )
        .catch(err => this.handleError(err));
  };

  guardarCuentas(){
    this.cargando=true;
    this.api.post("cuentabanco",this.banco)
        .then(respuesta => {
          if(respuesta && respuesta.extraInfo){
            this.banco = respuesta.extraInfo;
            this.toastr.success("Registro guardado exitosamente", 'Exito');
            this.cargando = false;
            this.listado = true;
            this.listarCuentas();
            this.vistaFormulario = false;
          } else {
            this.cargando=false;
            this.toastr.error(respuesta.operacionMensaje, 'Error');
          }
        })
        .catch(err => this.handleError(err));

  };

  private handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
    this.cargando =false;
  };
}
