import { Component, OnInit } from '@angular/core';
import { Paginacion } from '../../entidades/entidad.paginacion';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { Empresa } from '../../entidades/entidad.empresa';
import { ConfirmacionComponent } from '../../util/confirmacion/confirmacion.component';
import { ToastrService } from 'ngx-toastr';
import { LS } from  '../../app-constants';
import {AuthService }  from '../../servicios/auth.service';
import { Ubigeo } from '../../entidades/entidad.ubigeo';
import {Tipoubigeo } from  '../../entidades/entidad.tipoubigeo';

@Component({
  selector: 'app-modal-ubigeo',
  templateUrl: './modal-ubigeo.component.html',
  styleUrls: ['./modal-ubigeo.component.css']
})
export class ModalUbigeoComponent implements OnInit {

  public ubigeo:Ubigeo;
  public ubigeos:Ubigeo[];
  public page:number = 1;
  public nombre:string ="";
  public codigo:string = "";
  public vistaFormulario = false;
  public tipos:any=[];
  public cargando=false;
  public paginacion: Paginacion;
  public confirmarcambioestado:boolean=false;
  public solicitando = false;
  public verNuevo:boolean = false;
  public parametros:any={};

  constructor(public activeModal: NgbActiveModal,
              public api: ApiRequestService,
              public apiRequest: ApiRequestService,
              private modalService: NgbModal,
              public modal: NgbModal,
              public auth: AuthService,
              public toastr: ToastrService) {
      this.ubigeo=new Ubigeo();
      this.paginacion = new Paginacion();
  }

  ngOnInit() {
     this.traertipos();
     this.listarUbigeo();
  };

    busqueda():void{
        this.page = 1;
        this.parametros ={
        "nombre":this.nombre,
            "codigo":this.codigo
        };
        this.listarUbigeo();
    };

    limpiar():void{
        this.nombre= "";
        this.codigo="";
        this.parametros = {};
        this.listarUbigeo();

    };

    confirmarEliminacion(ubigeo):void{
        const modalRef1 = this.modalService.open(ConfirmacionComponent);
        modalRef1.result.then((result) => {
            this.eliminarUbigeo(ubigeo);
        }, (reason) => {
        });
    };

    eliminarUbigeo(ubigeo){
        this.cargando = true;
        return this.apiRequest.post('ubigeo/eliminar', {id:ubigeo.id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.ubigeos.splice(this.ubigeos.indexOf(ubigeo),1);
                    } else {
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                    this.cargando = false;
                }
            )
            .catch(err => this.handleError(err));
    };

    guardarubigeo(){
        var isedicion= false;
        if(this.ubigeo.id){
            isedicion=true;
        }
        this.cargando=true;
        this.api.post("ubigeo",this.ubigeo)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.ubigeo = respuesta.extraInfo;
                    this.toastr.success("Registro guardado exitosamente", 'Exito');
                    this.vistaFormulario = false;
                    if(!isedicion){
                        this.ubigeos.push(this.ubigeo);
                    }else{
                        this.limpiar();
                    }
                    this.cargando=false;
                } else {
                    this.cargando=false;
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    };

    confirmarcambiodeestado(ubigeo):void{
        const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.confirmarcambioestado=true;
            this.cambiarestadoUbigeo(ubigeo);
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            ubigeo.estado = !ubigeo.estado;
            this.auth.agregarmodalopenclass();
        });
    };

    cambiarestadoUbigeo(ubigeo){
        this.cargando = true;
        return this.apiRequest.post('ubigeo/eliminar', {id:ubigeo.id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.toastr.success(data.operacionMensaje," Exito");
                        this.listarUbigeo();
                    } else {
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                    this.cargando = false;
                }
            )
            .catch(err => this.handleError(err));
    };

    traerParaEdicion(id){
        this.cargando = true;
        this.vistaFormulario = true;
        this.verNuevo = true;
        return this.apiRequest.post('ubigeo/obtener', {id:id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.cargando = false;
                        this.ubigeo = data.extraInfo;
                        if(this.ubigeo && !this.ubigeo.idtipoubigeo){
                            this.ubigeo.idtipoubigeo = new Ubigeo();
                        }
                        this.llenarCombo(this.ubigeo);
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

    llenarCombo(ubigeo){
        let tipo= ubigeo.idtipoubigeo;
        let tiposelect = this.tipos.find(item => item.id == tipo.id);
        this.ubigeo.idtipoubigeo = tiposelect;
    };

    listarUbigeo(){
        this.cargando= true;
        this.api.post('ubigeo/pagina/'+this.page+'/cantidadPorPagina/'+this.paginacion.cantidadPorPagina, this.parametros)
            .then(data => {
                if(data){
                    this.paginacion.totalRegistros = data.totalRegistros;
                    this.paginacion.paginaActual = data.paginaActual;
                    this.paginacion.totalPaginas = data.totalPaginas;
                    this.ubigeos = data.registros;
                    this.cargando = false;
                }
            })
            .catch(err => this.handleError(err));
    };

    elegirUbigeo(o){
        this.activeModal.close(o);
    };

    nuevo(){
        this.vistaFormulario = true;
        this.verNuevo = false;
        this.ubigeo = new Ubigeo();
    };

    traertipos(){
        this.api.get("tipoubigeo/listar")
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.tipos = respuesta.extraInfo;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    };

    private handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');
        this.cargando =false;
    };
}
