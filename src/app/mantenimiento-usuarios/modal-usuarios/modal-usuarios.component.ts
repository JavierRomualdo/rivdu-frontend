import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiRequestService} from '../../servicios/api-request.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService}  from '../../servicios/auth.service';
import { Paginacion } from '../../entidades/entidad.paginacion';
import { ConfirmacionComponent } from '../../util/confirmacion/confirmacion.component';
import {ModalRolComponent} from '../../empresa/modal-rol/modal-rol.component'
import {Usuario} from '../../entidades/entidad.usuario';
import {Rol} from "../../entidades/entidad.rol";
import { Empresa } from '../../entidades/entidad.empresa';
import { Sucursal } from '../../entidades/entidad.sucursal';
import { LS } from '../../app-constants';

@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrls: ['./modal-usuarios.component.css']
})
export class ModalUsuariosComponent implements OnInit {

    public cargando: boolean = false;
    public vistaFormulario: boolean = false;
    public verNuevo: boolean = false;

    //Variables para realizar la Paginacion
    public page: number = 1;
    public paginacion: Paginacion;
    public parametros: any = {};

    public usuariosLista: any[];
    public usuarios: Usuario;

    //Modal Roles
    public tiposroles:any=[];
    public listaPR: any = [];
    public rol:Rol;
    public idRol: number=0;

    //Para traer la empresa
    public ruc:string="";
    public sucursales:Sucursal[];
    public sucursal:Sucursal;
    public empresa:Empresa;

    public confirmarCambioEstado:boolean = false;


    constructor(public activeModal: NgbActiveModal,
                public api: ApiRequestService,
                public toastr: ToastrService,
                public modal: NgbModal,
                private modalService: NgbModal,
                public auth: AuthService,
                private apiRequest: ApiRequestService) {


        this.usuarios = new Usuario();
        this.paginacion = new Paginacion();

        this.sucursales= [];
        this.empresa = new Empresa();
        this.sucursal= new Sucursal();
        this.usuarios.idempresa = new Empresa();
        this.rol = new Rol();
    }

    ngOnInit() {
        this.traerTiposRol();
        this.ruc = localStorage.getItem(LS.KEY_RUC_EMPRESA);
        this.listarModalUsuarios();
    }

    listarModalUsuarios() {
        this.cargando = true;
        this.api.post('usuario/pagina/' + this.page + '/cantidadPorPagina/' + this.paginacion.cantidadPorPagina, this.parametros)
            .then(data => {
                if (data) {
                    this.cargando = false;
                    this.paginacion.totalRegistros = data.totalRegistros;
                    this.paginacion.paginaActual = data.paginaActual;
                    this.paginacion.totalPaginas = data.totalPaginas;
                    this.usuariosLista = data.registros;
                }
            })
            .catch(err => this.handleError(err));
    }

    busquedaPorDni(dni) {
        this.cargando = true;
        this.vistaFormulario = true;
        this.verNuevo = true;
        this.apiRequest.post('usuario/validarDni', {dni: dni})
            .then(respuesta => {
                if (respuesta && respuesta.extraInfo) {
                    this.usuarios = respuesta.extraInfo;
                    this.cargando = false;
                    this.listaPR = this.usuarios.UsuarioaccesoList && this.usuarios.UsuarioaccesoList.length > 0 ? this.usuarios.UsuarioaccesoList : [];
                } else {
                    this.toastr.info(respuesta.operacionMensaje,"Informacion");
                    this.vistaFormulario = true;
                    this.cargando = false;
                    this.usuarios =new Usuario();
                }
            })
            .catch(err => this.handleError(err));
    }


    abriModalNuevoUsuario() {
        this.vistaFormulario=true;
        this.verNuevo = false;
        this.usuarios= new Usuario();
        this.usuarios.idempresa = new Empresa();
        this.listaPR = this.listaPR && this.listaPR.length>0 ? this.listaPR : [];
    };

    traerParaEdicion(id) {
        this.cargando = true;
        this.vistaFormulario = true;
        this.verNuevo = true;
        return this.apiRequest.post('usuario/obtener', {id: id})
            .then(
                data => {
                    if (data && data.extraInfo) {
                        this.cargando = false;
                        this.usuarios = data.extraInfo;
                        if (this.usuarios && !this.usuarios.idempresa){
                            this.usuarios.idempresa = new Empresa();
                        }
                        this.listaPR = this.usuarios.UsuarioaccesoList && this.usuarios.UsuarioaccesoList.length > 0 ? this.usuarios.UsuarioaccesoList : [];
                    } else {
                        this.toastr.info(data.operacionMensaje, "Informacion");
                        this.vistaFormulario = false;
                        this.cargando = false;
                    }
                }
            )
            .catch(err => this.handleError(err));
    };

    traerTiposRol(){
        this.api.get("tiposroles/listar")
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.tiposroles = respuesta.extraInfo;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    }


    abrirModalRol():void{
        const modalRef = this.modalService.open(ModalRolComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: true});
        modalRef.result.then((result) => {
            let rol = result;
            let pr = {
                personarolPK:{
                    idrol:rol.id,
                    idpersona:this.usuarios.id
                },
                estado:true,
                idrol:rol
            }
            let rSelect = this.listaPR.find(item => item.idrol.id === rol.id);
            if (rSelect && rSelect.idrol && rSelect.idrol.id) {
                this.toastr.warning('Rol ya existe', 'Aviso');
            } else {
                this.listaPR.push(pr);
            }
        }, (reason) => {
        });
    }

    confirmarCambioEstadoUsuario(usuario):void{
        const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.confirmarCambioEstado=true;
            this.cambiarEstadoUsuario(usuario);
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            usuario.estado= !usuario.estado;
            this.auth.agregarmodalopenclass();
        });
    };

    cambiarEstadoUsuario(usuario){
        this.cargando = true;
        return this.apiRequest.post('usuario/eliminar', {id:usuario.id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.toastr.success(data.operacionMensaje," Exito");
                        this.listarModalUsuarios();
                    } else {
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                    this.cargando = false;
                }
            )
            .catch(err => this.handleError(err));
    };


    guardarUsuarios(){
        this.cargando= true;
        this.usuarios.UsuarioaccesoList = this.listaPR;

        if(this.usuarios.id){
            return this.apiRequest.put('usuario', this.usuarios)
                .then(
                    data => {
                        if(data && data.extraInfo){
                            this.cargando = false;
                            this.vistaFormulario = false;
                            this.usuarios = data.extraInfo;
                            let persona = this.usuariosLista.find(item => item.id === this.usuarios.id);
                            let index = this.usuariosLista.indexOf(persona);
                            this.usuariosLista[index] = this.usuarios;
                            this.usuarios = new Usuario();
                        }else{
                            this.toastr.info(data.operacionMensaje,"Informacion");
                            this.cargando = false;
                        }
                    }
                )
                .catch(err => this.handleError(err));
        } else {
            return this.apiRequest.post('usuario', this.usuarios)
                .then(
                    data => {
                        if(data && data.extraInfo){
                            this.cargando = false;
                            this.usuariosLista.push(data.extraInfo);
                            this.vistaFormulario = false;
                            this.usuarios =new Usuario();
                        }
                        else{
                            this.toastr.info(data.operacionMensaje,"Informacion");
                            this.cargando = false;
                        }
                    }
                )
                .catch(err => this.handleError(err));
        }
    };

    traerEmpresa(){
        this.api.get("empresa/validar/"+this.ruc)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.usuarios.idempresa = respuesta.extraInfo;
                }else{
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    };



    private handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');
        this.cargando = false;
    }

}
