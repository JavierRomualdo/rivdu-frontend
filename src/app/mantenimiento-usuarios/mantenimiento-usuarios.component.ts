import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ModalRolesAccesoComponent } from "./modal-roles-acceso/modal-roles-acceso.component";
import { ModalRolesComponent } from "./modal-roles/modal-roles.component";


@Component({
    selector: 'app-mantenimiento-usuarios',
    templateUrl: './mantenimiento-usuarios.component.html',
    styleUrls: ['./mantenimiento-usuarios.component.css']
})
export class MantenimientoUsuariosComponent implements OnInit {

    constructor(
        public authService: AuthService,
        public router: Router,
        public modalService: NgbModal,
        private modal: NgbModal,
        public auth: AuthService
    ) { }

    ngOnInit() {
    }

    abrirRoles(): void {
        const modalRef = this.modalService.open(ModalRolesComponent, { size: 'sm', keyboard: false });
        modalRef.result.then((result) => {
        }, (reason) => {
        });
    }
    //abrir modal roles permiso principal
    abrirRolesPermiso(): void {
        const modalRef = this.modalService.open(ModalRolesAccesoComponent, { size: 'sm', keyboard: false });
        modalRef.result.then((result) => {
        }, (reason) => {
        });
    }
}
