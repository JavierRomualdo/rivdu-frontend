import { Component, Input, OnInit } from '@angular/core';
import { Paginacion } from '../../entidades/entidad.paginacion';
import { NgbModal , NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmacionComponent } from '../../util/confirmacion/confirmacion.component';
import { ModalUbigeoComponent } from '../../mantenimiento-captacion/modal-ubigeo/modal-ubigeo.component';
import { Persona } from '../../entidades/entidad.persona';
import { Ubigeo } from '../../entidades/entidad.ubigeo';
import { Rol } from '../../entidades/entidad.rol';
import {AuthService }  from '../../servicios/auth.service';
import {ModalEmpresaComponent} from '../modal-empresa/modal-empresa.component';
import {ModalRolComponent} from '../modal-rol/modal-rol.component';

@Component({
  selector: 'app-modal-ingenieros',
  templateUrl: './modal-ingenieros.component.html',
  styleUrls: ['./modal-ingenieros.component.css']
})
export class ModalIngenierosComponent implements OnInit {

    @Input() responsable;
    @Input() proveedores;
    @Input() captadores;
    public page: number = 1;
    public paginacion: Paginacion;
    public cargando:boolean= false;
    public vistaFormulario = false;
    public dni:string="";
    public nombre:string="";
    public ingenieros:Persona[];
    public ingeniero:Persona;
    public parametros:any={};
    public verNuevo:boolean = false;
    public tiposroles:any=[];
    public rol: Rol;
    public idRol: number=0;
    public confirmarcambioestado:boolean=false;
    public listapersonaroles : any = [];
    public rolSelected: any ={};
    //Para agregar Rol a listarNuevoModal
    public mostrarRolResponsable:boolean = true;
    //para limpiar el campo de rol
    public ver:boolean =true;

    public listaPR:any = [];

      constructor(
        public activeModal: NgbActiveModal,
        public api: ApiRequestService,
        private modalService: NgbModal,
        private modal: NgbModal,
        private apiRequest: ApiRequestService,
        public toastr: ToastrService,
        public auth: AuthService
      ) {
        this.ingenieros= [];
        this.paginacion = new Paginacion();
        this.ingeniero= new Persona();
        this.ingeniero.idubigeo = new Ubigeo();
        this.rol =new Rol();
      }

    ngOnInit() {
        this.traertiposrol();
        if (this.captadores){
            this.idRol = 2;
        }
        if(this.responsable){
              this.idRol =3;
        }
        if (this.proveedores) {
            this.idRol = 7;
        }

        this.busqueda();
    }

    busqueda(): void {
        this.page = 1;
        this.parametros = {
            "dni":this.dni,
            "nombre":this.nombre,
            "idrol":this.idRol
        };
        this.listarIngenieros();
    };

    limpiar():void{
        this.nombre ="";
        this.dni = "";
        this.nombre ="";
        this.dni = "";
        if (this.idRol == 2){
            this.parametros = {
                "dni":null,
                "nombre":null,
                "idrol":2
            };
            this.idRol = 2;
            this.ver = false;
            this.listarIngenieros();
        }
        if (this.idRol == 3){
            this.parametros = {
                "dni":null,
                "nombre":null,
                "idrol":3
            };
            this.idRol = 3;
            this.ver = false;
            this.listarIngenieros();
        }
        if (this.idRol == 7){
            this.parametros = {
                "dni":null,
                "nombre":null,
                "idrol":7
            };
            this.idRol = 7;
            this.ver = false;
            this.listarIngenieros();
        }else{
            this.parametros = {
                "dni":null,
                "nombre":null,
                "idrol":0
            };
            this.idRol = null;
            this.ver = false;
            this.listarIngenieros();
        };
        }



    nuevo(){
        this.vistaFormulario=true;
        this.verNuevo = false;
        this.ingeniero= new Persona();
        this.ingeniero.idubigeo = new Ubigeo();
        this.listaPR = this.listaPR && this.listaPR.length>0 ? this.listaPR : [];
    };

    guardarIngenieros(){
        this.cargando= true;
        this.ingeniero.personarolList = this.listaPR;
        if(this.ingeniero && this.ingeniero.idubigeo && !this.ingeniero.idubigeo.id){
            this.ingeniero.idubigeo= null;
        }
        if(this.ingeniero.id){
            return this.apiRequest.put('ingeniero', this.ingeniero)
                .then(
                    data => {
                        if(data && data.extraInfo){
                            this.cargando = false;
                            this.vistaFormulario = false;
                            this.ingeniero = data.extraInfo;
                            let persona = this.ingenieros.find(item => item.id === this.ingeniero.id);
                            let index = this.ingenieros.indexOf(persona);
                            this.ingenieros[index] = this.ingeniero;
                            this.ingeniero = new Persona();
                        }else{
                            this.toastr.info(data.operacionMensaje,"Informacion");
                            this.cargando = false;
                        }
                        if(this.ingeniero && !this.ingeniero.idubigeo){
                            this.ingeniero.idubigeo= new Ubigeo();
                        }
                    }
                )
                .catch(err => this.handleError(err));
        } else {
            return this.apiRequest.post('ingeniero', this.ingeniero)
                .then(
                    data => {
                        if(data && data.extraInfo){
                            this.cargando = false;
                            this.ingenieros.push(data.extraInfo);
                            this.vistaFormulario = false;
                            this.ingeniero =new Persona();
                        }
                        else{
                            this.toastr.info(data.operacionMensaje,"Informacion");
                            this.cargando = false;
                        }
                        if(this.ingeniero && !this.ingeniero.idubigeo){
                            this.ingeniero.idubigeo= new Ubigeo();
                        }
                    }
                )
                .catch(err => this.handleError(err));
        }
    };

    confirmarcambiodeestado(ingeniero):void{
       const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.confirmarcambioestado=true;
            this.cambiarestadoingeniero(ingeniero);
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            ingeniero.estado = !ingeniero.estado;
            this.auth.agregarmodalopenclass();
        });
    };

    cambiarestadoingeniero(ingeniero){
        this.cargando = true;
        return this.apiRequest.post('ingeniero/eliminar', {id:ingeniero.id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.toastr.success(data.operacionMensaje," Exito");
                        this.listarIngenieros();
                    } else {
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                    this.cargando = false;
                }
            )
            .catch(err => this.handleError(err));
    };

    abrirModalUbigeo():void{
        const modalRef = this.modal.open(ModalUbigeoComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.ingeniero.idubigeo = result;
            console.log("Ha sido cerrado "+result);
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            console.log("Ha sido cerrado "+reason);
            this.auth.agregarmodalopenclass();
        });
    };

    traerParaEdicion(id){
        this.cargando = true;
        this.vistaFormulario = true;
        this.verNuevo = true;
        return this.apiRequest.post('ingeniero/obtener', {id: id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.cargando = false;
                        this.ingeniero = data.extraInfo;
                        if(this.ingeniero && !this.ingeniero.idubigeo){
                            this.ingeniero.idubigeo = new Ubigeo();
                        }
                        this.listaPR = this.ingeniero.personarolList && this.ingeniero.personarolList.length > 0 ? this.ingeniero.personarolList : [];
                    }
                    else{
                        this.toastr.info(data.operacionMensaje,"Informacion");
                        this.vistaFormulario = false;
                        this.cargando = false;
                    }
                }
            )
            .catch(err => this.handleError(err));
    };

    elegirIngeniero(o){
        this.activeModal.close(o);
    };

    listarIngenieros(){
      this.cargando= true;
      this.api.post('ingeniero/pagina/'+this.page+'/cantidadPorPagina/'+this.paginacion.cantidadPorPagina, this.parametros)
        .then(data => {
            if(data){
                this.cargando = false;
                this.paginacion.totalRegistros = data.totalRegistros;
                this.paginacion.paginaActual = data.paginaActual;
                this.paginacion.totalPaginas = data.totalPaginas;
                this.ingenieros = data.registros;
            }
        })
        .catch(err => this.handleError(err));
  };

    traertiposrol(){
        this.api.get("tiposroles/listar")
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.tiposroles = respuesta.extraInfo;
                    if(this.captadores){
                        this.idRol =2;
                        let rolselect = this.tiposroles.find(item=> item.id == 2);
                        let pr = {
                            personarolPK:{
                                idrol:rolselect.id,
                                idpersona:this.ingeniero.id
                            },
                            estado:true,
                            idrol:rolselect
                        };
                        this.listaPR.push(pr);
                    }
                    if(this.responsable){
                        this.idRol =3;
                        let rolselect = this.tiposroles.find(item=> item.id == 3);
                        let pr = {
                            personarolPK:{
                                idrol:rolselect.id,
                                idpersona:this.ingeniero.id
                            },
                            estado:true,
                            idrol:rolselect
                        };
                        this.listaPR.push(pr);
                    }
                    if(this.proveedores){
                        this.idRol =7;
                        let rolselect = this.tiposroles.find(item=> item.id == 7);
                        let pr = {
                            personarolPK:{
                                idrol:rolselect.id,
                                idpersona:this.ingeniero.id
                            },
                            estado:true,
                            idrol:rolselect
                        };
                        this.listaPR.push(pr);
                    }
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    }

    quitarrol(){
        alert("Quitar rol");
    }

    abrirrol():void{
        const modalRef = this.modalService.open(ModalRolComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: true});
        modalRef.result.then((result) => {
            let rol = result;
            let pr = {
                personarolPK:{
                    idrol:rol.id,
                    idpersona:this.ingeniero.id
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

    busquedaPorDni(dni) {
        this.cargando = true;
        this.vistaFormulario = true;
        this.verNuevo = true;
        this.apiRequest.post('ingeniero/validarDni', {dni: dni})
            .then(respuesta => {
                if (respuesta && respuesta.extraInfo) {
                    this.ingeniero = respuesta.extraInfo;
                    this.cargando = false;
                    this.listaPR = this.ingeniero.personarolList && this.ingeniero.personarolList.length > 0 ? this.ingeniero.personarolList : [];
                    if(this.responsable){
                        this.mostrarRolResponsable = false;
                    }
                }
                else {
                    this.toastr.info(respuesta.operacionMensaje,"Informacion");
                    this.vistaFormulario = true;
                    this.cargando = false;
                    this.ingeniero =new Persona();
                    this.ingeniero.idubigeo = new Ubigeo();
                    if(this.responsable){
                        this.mostrarRolResponsable = true;
                    }
                } this.cargando = false;
            })
            .catch(err => this.handleError(err));
    }

  private handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
      this.cargando = false;
  }

}
