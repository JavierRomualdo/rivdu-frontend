import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalCaptadorComponent } from './modal-captador/modal-captador.component'
import { ModalEspecificacionesComponent } from "./modal-especificaciones/modal-especificaciones.component";
import { ModalEstadocivilComponent } from "./modal-estadocivil/modal-estadocivil.component";
import { ModalRelacionpersonalComponent } from "./modal-relacionpersonal/modal-relacionpersonal.component";
import { ModalUbigeoComponent } from "./modal-ubigeo/modal-ubigeo.component";
import { ModalIngenierosComponent } from '../empresa/modal-ingenieros/modal-ingenieros.component';
import {ApiRequestService} from '../servicios/api-request.service';
import {Persona} from '../entidades/entidad.persona';
import {ToastrService} from 'ngx-toastr';
import {Paginacion} from '../entidades/entidad.paginacion';
import {Ubigeo} from '../entidades/entidad.ubigeo';

@Component({
  selector: 'app-mantenimiento-captacion',
  templateUrl: './mantenimiento-captacion.component.html',
  styleUrls: ['./mantenimiento-captacion.component.css']
})
export class MantenimientoCaptacionComponent implements OnInit {

    public page: number = 1;
    public paginacion: Paginacion;
    public cargando:boolean= false;
    public captador : Persona;
    public  listacaptadores:any=[];
    public parametros:any={};
    public captadores:Persona[];
    public dni:string="";
    public nombre:string="";
  constructor(
    private modalService: NgbModal, public api: ApiRequestService, public toastr: ToastrService
  ) {

      this.captadores= [];
      this.paginacion = new Paginacion();
      this.captador= new Persona();
      this.captador.idubigeo = new Ubigeo();

  }

  ngOnInit() {

  }

  abrirUbigeo():void{
    const modalRef = this.modalService.open(ModalUbigeoComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirDescuentos():void{
    const modalRef = this.modalService.open(ModalEspecificacionesComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirEstado():void{
    const modalRef = this.modalService.open(ModalEstadocivilComponent, {size: 'sm', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirRelacion():void{
    const modalRef = this.modalService.open(ModalRelacionpersonalComponent, {size: 'sm', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

    abrirCaptadores(): void {
        const modalRef = this.modalService.open(ModalIngenierosComponent, {size: 'lg', keyboard: false});
        modalRef.componentInstance.responsable = true;
        modalRef.result.then((result) => {
        }, (reason) => {
        });
    }

    private handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');
    }





}
