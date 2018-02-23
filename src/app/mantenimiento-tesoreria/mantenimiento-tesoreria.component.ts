import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalBancosComponent } from './modal-bancos/modal-bancos.component'
import { ModalCostosComponent } from "./modal-costos/modal-costos.component";
import { ModalCuentasComponent } from "./modal-cuentas/modal-cuentas.component";

@Component({
  selector: 'app-mantenimiento-tesoreria',
  templateUrl: './mantenimiento-tesoreria.component.html',
  styleUrls: ['./mantenimiento-tesoreria.component.css']
})
export class MantenimientoTesoreriaComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  abrirPlan():void{
    const modalRef = this.modalService.open(ModalCuentasComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirCostos():void{
    const modalRef = this.modalService.open(ModalCostosComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirBancos():void{
    const modalRef = this.modalService.open(ModalBancosComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

}
