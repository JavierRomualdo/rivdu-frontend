import { Component, OnInit } from '@angular/core';
import { NgbModal , NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { Paginacion } from '../../entidades/entidad.paginacion';
import { Empresa } from '../../entidades/entidad.empresa';
import { LS } from '../../app-constants';
import { ModalUbigeoComponent } from '../../mantenimiento-captacion/modal-ubigeo/modal-ubigeo.component';
import { ToastrService } from 'ngx-toastr';
import { Sucursal } from '../../entidades/entidad.sucursal';
import {AuthService }  from '../../servicios/auth.service';
import { ConfirmacionComponent } from '../../util/confirmacion/confirmacion.component';
import { Ubigeo } from '../../entidades/entidad.ubigeo';

@Component({
  selector: 'app-modal-sucursales',
  templateUrl: './modal-sucursales.component.html',
  styleUrls: ['./modal-sucursales.component.css']
})
export class ModalSucursalesComponent implements OnInit {

  //declarando variables
  public page:number = 1;
  public paginacion:Paginacion;
  public cargando:boolean= false;
  public vistaFormulario = false;
  public ruc:string="";
  public nombre:string = "";
  public sucursales:Sucursal[];
  public sucursal:Sucursal;
  public parametros:any = {};
  public empresa:Empresa;
  public verNuevo:boolean= false;
  public confirmarcambioestado:boolean=false;
  constructor(
    public activeModal: NgbActiveModal,
    public api: ApiRequestService,
    private modalService: NgbModal,
    private modal:NgbModal,
    public auth: AuthService,
    private apiRequest: ApiRequestService,
    public toastr: ToastrService
  ) {
    this.sucursales= [];
    this.empresa = new Empresa();
    this.paginacion = new Paginacion();
    this.sucursal= new Sucursal();
    this.sucursal.ubigeo = new Ubigeo();
    this.sucursal.idempresa=new Empresa();
  }

  ngOnInit() {
    this.ruc = localStorage.getItem(LS.KEY_RUC_EMPRESA);
    this.listarSucursales();
  }

  traerEmpresa(){
    this.api.get("empresa/validar/"+this.ruc)
        .then(respuesta => {
          if(respuesta && respuesta.extraInfo){
            this.sucursal.idempresa = respuesta.extraInfo;
          }else{
            this.toastr.error(respuesta.operacionMensaje, 'Error');
          }
        })
        .catch(err => this.handleError(err));
  };

  nuevo(){
    this.vistaFormulario=true;
    this.cargando=true;
    this.verNuevo = false;
    this.sucursal= new Sucursal();
    this.sucursal.ubigeo= new Ubigeo();
    this.sucursal.idempresa = new Empresa();
    this.cargando= false;
  };

  abrirModalUbigeo():void{
    const modalRef = this.modal.open(ModalUbigeoComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
    modalRef.result.then((result) => {
      this.sucursal.ubigeo = result;
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
    this.verNuevo=true;
    return this.apiRequest.post('sucursal/obtener', {id:id})
        .then(
            data => {
              if(data && data.extraInfo){
                this.cargando = false;
                this.sucursal = data.extraInfo;
                if(this.sucursal && !this.sucursal.idempresa){
                  this.sucursal.idempresa = new Empresa();
                }
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

  guardarSucursales(){
    this.cargando= true;
    if(this.sucursal.id){
      return this.apiRequest.put('sucursal', this.sucursal)
          .then(
              data => {
                if(data && data.extraInfo){
                  this.cargando = false;
                  this.vistaFormulario = false;
                  this.sucursal = data.extraInfo;
                  let producto = this.sucursales.find(item => item.id === this.sucursal.id);
                  let index = this.sucursales.indexOf(producto);
                  this.sucursales[index] = this.sucursal;
                  this.sucursal = new Sucursal();
                }else{
                  this.toastr.info(data.operacionMensaje,"Informacion");
                  this.cargando = false;
                }
              }
          )
          .catch(err => this.handleError(err));
    } else {
      return this.apiRequest.post('sucursal', this.sucursal)
          .then(
              data => {
                if(data && data.extraInfo){
                  this.cargando = false;
                  this.sucursales.push(data.extraInfo);
                  this.vistaFormulario = false;
                  this.sucursal =new Sucursal();
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

  confirmarcambiodeestado(sucursal):void{
       const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
       modalRef.result.then((result) => {
            this.confirmarcambioestado=true;
            this.cambiarestadoSucursal(sucursal);
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            sucursal.estado = !sucursal.estado;
            this.auth.agregarmodalopenclass();
        });
    };

  cambiarestadoSucursal(sucursal){
        this.cargando = true;
        return this.apiRequest.post('sucursal/eliminar', {id:sucursal.id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.toastr.success(data.operacionMensaje," Exito");
                        this.listarSucursales();
                    } else {
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                    this.cargando = false;
                }
            )
            .catch(err => this.handleError(err));
    }

  listarSucursales(){
        this.cargando= true;
        this.api.post('sucursal/pagina/'+this.page+'/cantidadPorPagina/'+this.paginacion.cantidadPorPagina, this.parametros)
            .then(data => {
                if(data){
                    this.cargando = false;
                    this.paginacion.totalRegistros = data.totalRegistros;
                    this.paginacion.paginaActual = data.paginaActual;
                    this.paginacion.totalPaginas = data.totalPaginas;
                    this.sucursales = data.registros;
                }
            })
            .catch(err => this.handleError(err));
    };

  confirmarEliminacion(sucursal){
    const modalRef1 = this.modalService.open(ConfirmacionComponent);
    modalRef1.result.then((result) => {
      this.eliminarSucursal(sucursal);
    }, (reason) => {
    });
  };

  eliminarSucursal(sucursal){
    this.cargando = true;
    return this.apiRequest.post('sucursal/eliminar', {id:sucursal.id})
        .then(
            data => {
              if(data && data.extraInfo){
                this.sucursales.splice(this.sucursales.indexOf(sucursal),1);
              } else {
                this.toastr.info(data.operacionMensaje,"Informacion");
              }
              this.cargando = false;
            }
        )
        .catch(err => this.handleError(err));
  };

  private handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
    this.cargando = false;
  };
}
