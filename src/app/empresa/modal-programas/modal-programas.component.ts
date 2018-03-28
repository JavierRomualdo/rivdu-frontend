import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { LS } from '../../app-constants';
import { Programas } from '../../entidades/entidad.programas';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {ModalIngenierosComponent} from '../modal-ingenieros/modal-ingenieros.component';
import {ModalEspecificacionesComponent } from '../../mantenimiento-captacion/modal-especificaciones/modal-especificaciones.component';
import {ConfirmacionComponent} from '../../util/confirmacion/confirmacion.component';
import {AuthService }  from '../../servicios/auth.service';
import {Ubigeo} from '../../entidades/entidad.ubigeo';
import {Empresa} from '../../entidades/entidad.empresa';
import {Persona} from '../../entidades/entidad.persona';
import {Responsable} from '../../entidades/entidad.responsable';
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'app-modal-programas',
  templateUrl: './modal-programas.component.html',
  styleUrls: ['./modal-programas.component.css']
})
export class ModalProgramasComponent implements OnInit {

    @Input() edit;
    public programa:Programas;
    public cargando:boolean=false;
    public listaRP:any = [];
    public listaET:any=[];
    public listaRoles:any = [];
    public ingeniero:Persona;
    public programas:Programas[];
    public vistaFormulario = false;
    public verNuevo=false;
    public confirmarcambioestado=false;

    constructor(public activeModal: NgbActiveModal,
                private apiRequest: ApiRequestService,
                public api: ApiRequestService,
                public toastr: ToastrService,
                public modalService: NgbModal,
                public modal: NgbModal,
                public auth: AuthService) {
        this.programa = new Programas();
    }

    ngOnInit() {
        if(this.edit){
            this.traerParaEdicion(this.edit);
        }
    }
    nuevo(){
        this.vistaFormulario=true;
        this.verNuevo = false;
        this.ingeniero= new Persona();
        this.ingeniero.idubigeo = new Ubigeo();
        this.listaRP=[];
        this.listaET=[];
    };

    guardarProgramas(){
        this.cargando=true;
        this.programa.responsableList = this.listaRP;

        this.programa.programaespecificacionesList = this.listaET;
        if(!this.programa.id){
            this.api.post("programas",this.programa)
                .then(respuesta => {
                    if(respuesta && respuesta.extraInfo){
                        this.programa = respuesta.extraInfo;
                        this.toastr.success(respuesta.operacionMensaje, 'Exito');
                        this.activeModal.close(this.programa);
                        this.cargando=false;

                    } else {
                        this.cargando=false;
                        this.toastr.error(respuesta.operacionMensaje, 'Error');
                    }
                })
                .catch(err => this.handleError(err));
        }
        else{
            return this.api.put('programas', this.programa)
                .then(
                    data => {
                        if(data && data.extraInfo){
                            this.cargando = false;
                            this.programa = data.extraInfo;
                            this.programa = new Programas();
                            this.toastr.success(data.operacionMensaje, 'Exito');
                            this.activeModal.close(this.programa);
                            this.cargando = false;
                        }else{
                            this.toastr.info(data.operacionMensaje,"Informacion");
                            this.cargando = false;
                        }
                    }
                )
                .catch(err => this.handleError(err));
        }

    }
    private handleError(error: any): void {
        this.cargando=false;
        this.toastr.error("Error Interno", 'Error');
    }
    abrirEspecificaciones() : void {
        const modalRef = this.modalService.open(ModalEspecificacionesComponent, {size: 'sm', keyboard: false , windowClass:'nuevo-modal'});
        modalRef.result.then((result) => {
            let especificacion = result;
            let pe = {
                programaespecificacionPK:{
                    idespecificacion:especificacion.id,
                    idprograma:this.programa.id
                },
                estado:true,
                idespecificacion:especificacion
            };
            let rSelect = this.listaET.find(item => item.idespecificacion.id === especificacion.id);
            if (rSelect && rSelect.idespecificacion && rSelect.idespecificacion.id) {
                this.toastr.warning('Especificacion ya existe', 'Aviso');
            } else {
                this.listaET.push(pe);
            }
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            this.auth.agregarmodalopenclass();
        });
    }

    abrirIngenieros():void{
        const modalRef = this.modalService.open(ModalIngenierosComponent, {size: 'sm', keyboard: false , windowClass:'nuevo-modal'});
        modalRef.result.then((result) => {
            let persona = result;
            let pp = {
                idrol:null,
                idprograma:this.programa.id,
                idpersona:persona,
                estado:true
            };
            this.TraerRoles(persona, pp);
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            this.auth.agregarmodalopenclass();
        });
    }

    TraerRoles(o, pp){
        return this.apiRequest.post('ingeniero/obtener', {id: o.id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.cargando = false;
                        let listaroles = data.extraInfo.personarolList;
                        o.personarolList = listaroles;
                        let pSelect = this.listaRP.find(item => item.idpersona.id === o.id);
                        if (pSelect && pSelect.idpersona && pSelect.idpersona.id) {
                            this.toastr.warning('Persona  ya existe', 'Aviso');
                        } else {
                            if(listaroles && listaroles.length>0){
                                this.listaRP.push(pp);
                            }else{
                                this.toastr.warning('La persona necesita tener asignados roles, para ser agregada al programa ', 'Aviso');
                            }
                        }
                    }
                    else{
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                }
            )
            .catch(err => this.handleError(err));
    };

    confirmareliminado(li): void {
        const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal',size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            if(!li.id){
                this.quitarresposable(li);
            }
            else{
                this.eliminarresponsable(li);
            }
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            this.auth.agregarmodalopenclass();
        });
    };

    eliminarresponsable(li){
        this.api.delete("responsable/eliminarresponsable/"+li.id)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.listaRP.splice(this.listaRP.lastIndexOf(li),1);
                    this.toastr.success("Registro eliminado exitosamente", 'Exito');
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    };

     traerParaEdicion(id){
        this.cargando = true;
        this.vistaFormulario = true;
        this.verNuevo = true;
        return this.apiRequest.post('programas/obtener', {id: id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.cargando = false;
                        this.programa = data.extraInfo;
                        this.listaRP = this.programa.responsableList && this.programa.responsableList.length > 0 ? this.programa.responsableList : [];
                        this.listaET = this.programa.programaespecificacionesList && this.programa.programaespecificacionesList.length > 0 ? this.programa.programaespecificacionesList : [];
                      this.seleccionacombo(this.programa);
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
     seleccionacombo(programa){
          for(let i=0;i<this.listaRP.length;i++){
              if(this.listaRP[i].idpersona){
                  let roles=this.listaRP[i].idpersona.personarolList;
                  let rolasignado = roles.find(item => item.idrol.id === this.listaRP[i].idrol.id);
                  this.listaRP[i].idrol=rolasignado.idrol;
              }
          }
     }
    quitarresposable(li){
        li.estado=false;
        this.listaRP.splice(this.listaRP.lastIndexOf(li) , 1);

    }

    quitarespecificacion(li){
        this.listaET.splice(this.listaET.lastIndexOf(li) , 1);
    }
    confirmarcambiodeestadoresponsable(responsable):void{
        const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.confirmarcambioestado=true;
            this.cambiarestadoresponsable(responsable);
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            responsable.estado = !responsable.estado;
            this.auth.agregarmodalopenclass();
        });
    };

    cambiarestadoresponsable(responsable){
        this.cargando = true;
        return this.apiRequest.post('responsable/eliminar', {id:responsable.id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.listaRP.splice(this.listaRP.lastIndexOf(responsable) , 1);
                        this.toastr.success(data.operacionMensaje," Exito");

                    } else {
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                    this.cargando = false;
                }
            )
            .catch(err => this.handleError(err));
    };

    cambiarestadoespecificacion(especificacion){
        this.cargando = true;
        return this.apiRequest.post('especificacion/eliminar', {id:especificacion.id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.listaET.splice(this.listaET.lastIndexOf(especificacion) , 1);
                        this.toastr.success(data.operacionMensaje," Exito");

                    } else {
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                    this.cargando = false;
                }
            )
            .catch(err => this.handleError(err));
    };

    confirmarcambiodeestadoespecificacion(especificacion):void{
        const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.confirmarcambioestado=true;
            this.cambiarestadoespecificacion(especificacion);
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            especificacion.estado = !especificacion.estado;
            this.auth.agregarmodalopenclass();
        });
    };
}
