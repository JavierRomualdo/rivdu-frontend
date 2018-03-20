import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { LS } from '../../app-constants';
import { Programas } from '../../entidades/entidad.programas';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {ModalIngenierosComponent} from '../modal-ingenieros/modal-ingenieros.component';
import {ConfirmacionComponent} from '../../util/confirmacion/confirmacion.component';
import {AuthService }  from '../../servicios/auth.service';
import {Ubigeo} from '../../entidades/entidad.ubigeo';
import {Empresa} from '../../entidades/entidad.empresa';
import {Persona} from '../../entidades/entidad.persona';
import {Responsable} from '../../entidades/entidad.responsable';


@Component({
  selector: 'app-modal-programas',
  templateUrl: './modal-programas.component.html',
  styleUrls: ['./modal-programas.component.css']
})
export class ModalProgramasComponent implements OnInit {

    public programa:Programas;
    public cargando:boolean=false;
    public listaRP:any = [];
    public listaRoles:any = [];
    public ingeniero:Persona;

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
    }

    guardarProgramas(){
        this.cargando=true;
        this.programa.responsableList = this.listaRP;
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

    private handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');
    }
    abrirIngenieros():void{
        const modalRef = this.modalService.open(ModalIngenierosComponent, {size: 'sm', keyboard: false , windowClass:'nuevo-modal'});
        modalRef.result.then((result) => {
            let persona = result;
            let pp = {
                idrol:null,
                idprograma:this.programa.id,
                idpersona:persona
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
        const modalRef = this.modal.open(ConfirmacionComponent, {size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.eliminarresponsable(li);
            this.toastr.success("Registro eliminado exitosamente", 'Exito');
        }, (reason) => {
        });
    };
    eliminarresponsable(li){
        this.api.delete("estadocivil/eliminarestadocliente/"+li.id)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.listaRP.splice(this.listaRP.lastIndexOf(li),1);
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    };
}
