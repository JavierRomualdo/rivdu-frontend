import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../servicios/auth.service';
import { Usuario } from '../../entidades/entidad.usuario';
import { Rol } from '../../entidades/entidad.rol';
import { Menu } from '../../entidades/entidad.menu';
import { ApiRequestService } from '../../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { Message, MenuItem, TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';

@Component({
  selector: 'app-modal-roles-acceso',
  templateUrl: './modal-roles-acceso.component.html',
  styleUrls: ['./modal-roles-acceso.component.css']
})
export class ModalRolesAccesoComponent implements OnInit {

  //variables for menu modal access
  public tiposrole: any = [];
  public tipos: any = [];
  public rol: Rol;
  public rolSelected: any = {};
  //variables roles y asignar Menu 
  public menu:Menu;
  public tiposroles: any;
  public idRol: any;
  //variables para tree p 
  msgs: Message[];
  @ViewChild('expandingTree')
  expandingTree: Tree;
  filesTree4: TreeNode[];
  selectedFile2: TreeNode;
  items: MenuItem[];
  loading: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    public api: ApiRequestService, 
    public toastr: ToastrService,
    public auth:AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.traertiposrol();
  }

  llenarMenus(){
    this.filesTree4 = [
      {
        "label": "Documents",
        "children": [{
          "label": "Administrador",
          "children": [{ "label": "Capataciones"}, 
                       { "label": "Compras"}]
                    
        },
        {
          "label": "Home",
          "children": [{ "label": "Invoices.txt" }]
        }]
      },
      {
        "label": "Pictures",
        "children": [
          { "label": "barcelona.jpg"},
          { "label": "logo.jpg"},
          { "label": "primeui.png"}]
      },
      {
        "label": "Movies",
        "children": [{
          "label": "Al Pacino",
          "children": [{ "label": "Scarface"}, 
                       { "label": "Serpico"}]
        },
        {
          "label": "Robert De Niro",
          "children": [{ "label": "Goodfellas"}, 
                       { "label": "Untouchables"}]
        }]
      }
    ]

  }

  //traer topo de roles
  traertiposrol() {
    this.api.get("tiposroles/listar")
      .then(respuesta => {
        if (respuesta && respuesta.extraInfo) {
          this.tiposroles = respuesta.extraInfo;
        } else {
          this.toastr.error(respuesta.operacionMensaje, 'Error');
        }
      })
      .catch(err => this.handleError(err));
  }
   //elije rol
   elegir(rol) {
    this.activeModal.close(rol);
  }

  //abrir modal para roles
  abrirRolesPermiso(): void {
    const modalRef = this.modalService.open(ModalRolesAccesoComponent, { size: 'lg', keyboard: false });
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }
  //abrir roles
  abrirRoles(): void {
    const modalRef = this.modalService.open(ModalRolesAccesoComponent, { size: 'lg', keyboard: false });
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }
  elegirRolMenu(id){
      
  }
  //listar menu combo
  listarMenuCombo(id){
    this.api.get("menu/menuselect/"+id).then(respuesta => {
        if (respuesta && respuesta.extraInfo) {
          this.filesTree4 = respuesta.extraInfo;
        } else {
          this.toastr.error(respuesta.operacionMensaje, 'Error');
        }
      })
      .catch(err => this.handleError(err));    

  }

  private handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');

  }
}
