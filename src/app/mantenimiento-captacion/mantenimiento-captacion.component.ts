import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalCaptadorComponent } from './modal-captador/modal-captador.component'
import { ModalDescuentosComponent } from "./modal-descuentos/modal-descuentos.component";
import { ModalEstadocivilComponent } from "./modal-estadocivil/modal-estadocivil.component";
import { ModalRelacionpersonalComponent } from "./modal-relacionpersonal/modal-relacionpersonal.component";
import { ModalUbigeoComponent } from "./modal-ubigeo/modal-ubigeo.component";

@Component({
  selector: 'app-mantenimiento-captacion',
  templateUrl: './mantenimiento-captacion.component.html',
  styleUrls: ['./mantenimiento-captacion.component.css']
})
export class MantenimientoCaptacionComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  abrirUbigeo():void{
    const modalRef = this.modalService.open(ModalUbigeoComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirDescuentos():void{
    const modalRef = this.modalService.open(ModalDescuentosComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirEstado():void{
    const modalRef = this.modalService.open(ModalEstadocivilComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirRelacion():void{
    const modalRef = this.modalService.open(ModalRelacionpersonalComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirCaptadores():void{
    const modalRef = this.modalService.open(ModalCaptadorComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

}
