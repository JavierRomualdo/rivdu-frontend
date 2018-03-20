import { Component, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../servicios/auth.service';
import {ApiRequestService} from '../../servicios/api-request.service';
import { Centrocostos } from '../../entidades/entidad.centrocostos';
import {ConfirmacionComponent} from '../../util/confirmacion/confirmacion.component';


@Component({
  selector: 'app-modal-costos',
  templateUrl: './modal-costos.component.html',
  styleUrls: ['./modal-costos.component.css']
})
export class ModalCostosComponent implements OnInit {

  public cargando:boolean = false;
  public  lista:any=[];
  public listado:boolean=false;
  public vistaFormulario:boolean = false;
  public verNuevo:boolean = false;
  public costo:Centrocostos;
  public costos:Centrocostos[];
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
    this.costo=new Centrocostos();
  }

  ngOnInit() {
    this.listarCostos();
  }


  confirmarcambiodeestado(costo){
    const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
    modalRef.result.then((result) => {
      this.confirmarestadoBanco=true;
      this.cambiarestadoCosto(costo);
      this.auth.agregarmodalopenclass();
    }, (reason) => {
      costo.estado = !costo.estado;
      this.auth.agregarmodalopenclass();
    });
  };

  cambiarestadoCosto(costo){
    this.cargando = true;
    return this.apiRequest.get('centrocosto/eliminarestadocosto/'+costo.id)
        .then(
            data => {
              if(data && data.extraInfo){
                this.toastr.success(data.operacionMensaje," Exito");
                this.listarCostos();
              } else {
                this.toastr.info(data.operacionMensaje,"Informacion");
              }
              this.cargando = false;
            }
        )
        .catch(err => this.handleError(err));
  }

  listarCostos(){
    this.cargando=true;
    this.api.get("centrocosto/listar")
        .then(respuesta => {
          if(respuesta && respuesta.extraInfo){
            this.costos = respuesta.extraInfo;
            this.cargando=false;
          } else {
            this.toastr.error(respuesta.operacionMensaje, 'Error');
            this.cargando = false;
          }
        })
        .catch(err => this.handleError(err));
  };

  nuevo(){
    this.vistaFormulario=true;
    this.cargando=true;
    this.verNuevo = false;
    this.costo =new Centrocostos();
    this.cargando= false;
  };

  traerParaEdicion(id){
    this.cargando = true;
    this.vistaFormulario = true;
    this.verNuevo=true;
    return this.api.post('centrocosto/obtener', {id: id})
        .then(
            data => {
              if(data && data.extraInfo){
                this.cargando = false;
                this.costo = data.extraInfo;
              } else {
                this.toastr.info(data.operacionMensaje,"Informacion");
              }
            }
        )
        .catch(err => this.handleError(err));
  };

  guardarCostos(){
    this.cargando=true;
    this.api.post("centrocosto",this.costo)
        .then(respuesta => {
          if(respuesta && respuesta.extraInfo){
            this.costo = respuesta.extraInfo;
            this.toastr.success("Registro guardado exitosamente", 'Exito');
            this.cargando = false;
            this.listado = true;
            this.listarCostos();
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
