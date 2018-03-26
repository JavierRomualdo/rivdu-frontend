import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiRequestService} from '../../servicios/api-request.service';
import {AuthService} from '../../servicios/auth.service';
import {ToastrService} from 'ngx-toastr';
import { Estadocliente } from '../../entidades/entidad.estadocliente';
import {ModalUbigeoComponent} from '../modal-ubigeo/modal-ubigeo.component';
import {ConfirmacionComponent} from '../../util/confirmacion/confirmacion.component';

@Component({
  selector: 'app-modal-estadocivil',
  templateUrl: './modal-estadocivil.component.html',
  styleUrls: ['./modal-estadocivil.component.css']
})
export class ModalEstadocivilComponent implements OnInit {
   public estadocivil: Estadocliente;
   public  lista:any=[];
   public confirmarcambioestado = false;
   public cargando:boolean=false;
   public clicknuevo:boolean=false;
   public clickeditar:boolean=false;
   public listado:boolean=false;
   public id:number;
   public listaestado:any;

  constructor(
      public activeModal: NgbActiveModal,
      public api: ApiRequestService,
      public apiRequest: ApiRequestService,
      public auth: AuthService,
      public toastr: ToastrService,
      public modal: NgbModal
  ) {
     this.estadocivil = new Estadocliente();
  }

  ngOnInit() {
    this.listarestados();
  }
    confirmarcambiodeestado(estadocivil){
        const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.confirmarcambioestado=true;
            this.cambiarestadoCivil(estadocivil);
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            estadocivil.estado = !estadocivil.estado;
            this.auth.agregarmodalopenclass();
        });
    };

    cambiarestadoCivil(estadocivil){
        this.cargando = true;
        return this.apiRequest.get('estadocivil/eliminarestadocliente/'+estadocivil.id)
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.toastr.success(data.operacionMensaje," Exito");
                        this.listarestados();
                    } else {
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                    this.cargando = false;
                }
            )
            .catch(err => this.handleError(err));

    };
    listarestados(){
      this.cargando=true;
        this.api.get("estadocivil/listar")
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

    eliminarestado(li){
      this.cargando = true;
      this.api.delete("estadocivil/eliminarestadocliente/"+li.id)
          .then(respuesta => {
              if(respuesta && respuesta.extraInfo){
                  this.lista.splice(this.lista.lastIndexOf(li),1);
              } else {
                  this.toastr.error(respuesta.operacionMensaje, 'Error');
              }
            this.cargando=false;
          })
          .catch(err => this.handleError(err));
    };

    guardarestado(){
        this.cargando=true;
        this.api.post("estadocivil",this.estadocivil)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.estadocivil = respuesta.extraInfo;
                    this.toastr.success("Registro guardado exitosamente", 'Exito');
                    this.cargando = false;
                    this.listado = true;
                    this.listarestados();
                    this.abrirlistado();
                } else {
                    this.cargando=false;
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    };

    abrinuevoestado(){
      this.clicknuevo=true;
      this.estadocivil=new Estadocliente();
    };

    abrirlistado(){
      this.clicknuevo=false;
      this.clickeditar=false;

    };

    confirmareliminado(li): void {
        const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.eliminarestado(li);
            this.toastr.success("Registro eliminado exitosamente", 'Exito');
            this.auth.agregarmodalopenclass();
        }, (reason) => {
          this.auth.agregarmodalopenclass();
        });
    };

    traerParaEdicion(id){
        this.clickeditar=true;
        this.clicknuevo=false;
        return this.api.post('estadocivil/obtener', {id: id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.estadocivil = data.extraInfo;
                    } else {
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                }
            )
            .catch(err => this.handleError(err));
    };

    editarestado(li):void{
        this.clickeditar=true;
    }

    probar():void{
        alert("Hola");
    }

    private handleError(error: any): void {
      this.cargando = false;
        this.toastr.error("Error Interno", 'Error');
    }

}
