import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalLaboresComponent } from './modal-labores/modal-labores.component'
import { ModalMaterialesComponent } from "./modal-materiales/modal-materiales.component";
import { ModalProveedoresComponent } from "./modal-proveedores/modal-proveedores.component";
import { ModalResponsablesComponent } from "./modal-responsables/modal-responsables.component";

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

  abrirProveedores():void{
    const modalRef = this.modalService.open(ModalProveedoresComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirResponsables():void{
    const modalRef = this.modalService.open(ModalResponsablesComponent, {size: 'lg', keyboard: false});
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
