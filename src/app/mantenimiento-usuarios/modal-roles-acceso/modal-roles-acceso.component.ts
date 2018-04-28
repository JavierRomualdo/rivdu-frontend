import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router} from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../servicios/auth.service';
import { Usuario } from '../../entidades/entidad.usuario';
import { Rol } from '../../entidades/entidad.rol';
import { Menu } from '../../entidades/entidad.menu';
import { ApiRequestService } from '../../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, TreeNode } from 'primeng/api';
import { Tree} from 'primeng/tree';

export interface Selected {
  children:any,
  id:number,
  label:"TESORERIA",
  parent:any
}
export class RolPermisoDTO {
  ids:any;
  idrol:number
}

@Component({
  selector: 'app-modal-roles-acceso',
  templateUrl: './modal-roles-acceso.component.html',
  styleUrls: ['./modal-roles-acceso.component.css']
})
export class ModalRolesAccesoComponent implements OnInit {

  //variables for menu modal access
  public tipos: any = [];
  public rol: Rol;
  public rolSelected: any = [];
  //variables roles y asignar Menu
  public tiposroles: any;
  public idRol: any;
  //variables para tree p 
  filesTree4: TreeNode[];
  selectedFile4: any;
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
    this.traertiposrol();; 
  }

  //traer tipo de roles
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

  //unchecket select
  nodeUnSelect(event) {
    let dto = this.construirDTO(event);
    this.api.post("tiposroles/desapilarmenu", dto)
    .then(respuesta => {
      if (respuesta && respuesta.extraInfo) {
      } else {
        this.toastr.error(respuesta.operacionMensaje, 'Error');
      }
    })
      .catch(err => this.handleError(err));
  }

  //onselect
  nodeSelect(event) {
    let dto = this.construirDTO(event);
    this.api.post("tiposroles/apilarmenu", dto)
    .then(respuesta => {
      if (respuesta && respuesta.extraInfo) {
      } else {
        this.toastr.error(respuesta.operacionMensaje, 'Error');
      }
    })
      .catch(err => this.handleError(err));
  } 
  
  construirDTO(event){
    let dto = new RolPermisoDTO();
    dto.ids = [];
    dto.ids.push(event.node.id);
    if(event.node && event.node.parent){
      dto.ids.push(event.node.parent.id);
    } else {
      if(event.node && event.node.children && event.node.children.length>0){
        for(let i=0; i<event.node.children.length; i++){
          dto.ids.push(event.node.children[i].id);
        }
      }
    }
    dto.idrol = this.idRol;
    return dto;
  }

  //listar menu combo
  listarMenuCombo(id){
      this.api.get("menu/menuselect/" + id).then(respuesta => {
        if (respuesta && respuesta.extraInfo) {
          let seleccionados = [];
          let data = respuesta.extraInfo;
          this.filesTree4 = respuesta.extraInfo; 
          for(let i=0; i<data.length; i++){
            if(data[i].estado){
              seleccionados.push(this.filesTree4[i]);
            }
            for(let j=0; j<data[i].children.length; j++){
              if(data[i].children[j].estado){
                seleccionados.push(data[i].children[j]);
              }
            }
          } 
          this.selectedFile4 = seleccionados; 
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
