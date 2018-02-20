import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalEmpresaComponent } from './modal-empresa/modal-empresa.component'
import {ModalProgramasComponent} from "./modal-programas/modal-programas.component";
import {ModalIngenierosComponent} from "./modal-ingenieros/modal-ingenieros.component";
import {ModalSucursalesComponent} from "./modal-sucursales/modal-sucursales.component";
import {ModalApoderadosComponent} from "./modal-apoderados/modal-apoderados.component";

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

  }

  abrirDatos():void{
    const modalRef = this.modalService.open(ModalEmpresaComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirPrograma():void{
    const modalRef = this.modalService.open(ModalProgramasComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
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

}
