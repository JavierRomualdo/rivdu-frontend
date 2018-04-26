import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../entidades/entidad.usuario';
import { Rol } from '../../entidades/entidad.rol';

@Component({
  selector: 'app-modal-roles',
  templateUrl: './modal-roles.component.html',
  styleUrls: ['./modal-roles.component.css']
})
export class ModalRolesComponent implements OnInit {
//variables
  public usuarios: Usuario[];
  public usuario: Usuario;
  public parametros: any = {};
  public verNuevo: boolean = false;
  public tiposroles: any = [];
  public tipos: any = [];
  public rol: Rol;
  public idRol: number = 0;
  public confirmarcambioestado: boolean = false;
  public listapersonaroles: any = [];
  public rolSelected: any = {};
  public mostrarRolResponsable: boolean = true;
  public ver: boolean = true;
  public listaPR: any = [];
  public listaestados: any = [];
  constructor() { }

  ngOnInit() {
    
  }

}
