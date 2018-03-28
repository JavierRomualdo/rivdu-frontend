import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalEmpresaComponent } from './modal-empresa/modal-empresa.component';
import {ModalProgramasComponent} from "./modal-programas/modal-programas.component";
import {ModalIngenierosComponent} from "./modal-ingenieros/modal-ingenieros.component";
import {ModalSucursalesComponent} from "./modal-sucursales/modal-sucursales.component";
import {ModalApoderadosComponent} from "./modal-apoderados/modal-apoderados.component";
import {ConfirmacionComponent} from '../util/confirmacion/confirmacion.component';
import {ApiRequestService} from '../servicios/api-request.service';
import {ToastrService} from 'ngx-toastr';
import {Programas} from '../entidades/entidad.programas';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

     public confirmarcambioestado:boolean=false;
     public cargando:boolean=false;
    public programa:Programas[];
    public  lista:any=[];
    public vistaFormulario = false;
    public verNuevo=false;

  constructor(
    public authService: AuthService,
    public router: Router,
    public modalService: NgbModal,
    private modal: NgbModal,
    public auth: AuthService,
    public toastr: ToastrService,
    public api: ApiRequestService
  ) { }

  ngOnInit() {
     this.listarprogramas();
  }

  abrirDatos():void{
    const modalRef = this.modalService.open(ModalEmpresaComponent, {size: 'sm', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirPrograma():void{
    const modalRef = this.modalService.open(ModalProgramasComponent, {size: 'lg', keyboard: true});
    modalRef.result.then((result) => {
        this.listarprogramas();
    }, (reason) => {
    });
  }

  abrirIngenieros():void{
    const modalRef = this.modalService.open(ModalIngenierosComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirSucursal():void{
    const modalRef = this.modalService.open(ModalSucursalesComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirApoderado():void{
    const modalRef = this.modalService.open(ModalApoderadosComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  confirmarcambiodeestado(programa) : void {
        const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.confirmarcambioestado=true;
            this.cambiarestadoprograma(programa);
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            programa.estado = !programa.estado;
            this.auth.agregarmodalopenclass();
        });
    };

    cambiarestadoresponsable(programa){
        this.cargando = true;
        return this.api.post('ingeniero/eliminar', {id: programa.id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.toastr.success(data.operacionMensaje," Exito");
                        this.listarprogramas();
                    } else {
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                    this.cargando = false;
                }
            )
            .catch(err => this.handleError(err));
    }

    cambiarestadoprograma(programa){
        this.cargando = true;
        return this.api.post('programas/eliminar', {id:programa.id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.toastr.success(data.operacionMensaje," Exito");
                        this.listarprogramas();
                    } else {
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                    this.cargando = false;
                }
            )
            .catch(err => this.handleError(err));
    };

    listarprogramas(){
        this.cargando=true;
        this.api.get("programas/listar")
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.lista = respuesta.extraInfo;
                    this.cargando = false;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                    this.cargando = false;
                }
            })
            .catch(err => this.handleError(err));

    };

    traerParaEdicion(id){
        const modalRef = this.modal.open(ModalProgramasComponent, {size: 'lg', keyboard: false});
        modalRef.componentInstance.edit = id;
        modalRef.result.then((result) => {
            this.listarprogramas();
        }, (reason) => {
        });
    }

    private handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');
        this.cargando = false;
    }

  }

