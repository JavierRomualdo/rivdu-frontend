import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalLaboresComponent } from './modal-labores/modal-labores.component'
import { ModalMaterialesComponent } from "./modal-materiales/modal-materiales.component";
import {ModalIngenierosComponent} from "../empresa/modal-ingenieros/modal-ingenieros.component";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-mantenimiento-construccion',
  templateUrl: './mantenimiento-construccion.component.html',
  styleUrls: ['./mantenimiento-construccion.component.css']
})
export class MantenimientoConstruccionComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {

  }
  abrirResponsables(): void {
    const modalRef = this.modalService.open(ModalIngenierosComponent, {size: 'lg', keyboard: false});
    modalRef.componentInstance.responsable = true;
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirLabores():void{
    const modalRef = this.modalService.open(ModalLaboresComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirMateriales():void{
    const modalRef = this.modalService.open(ModalMaterialesComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

}
