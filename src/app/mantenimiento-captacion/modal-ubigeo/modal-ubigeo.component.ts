import { Component, OnInit } from '@angular/core';
import { Paginacion } from '../../entidades/entidad.paginacion';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { ConfirmacionComponent } from '../../util/confirmacion/confirmacion.component';
import { ToastrService } from 'ngx-toastr';
import { LS } from  '../../app-constants';
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
  public  tipos:any=[];
  public cargando:boolean=false;
  public paginacion: Paginacion;
  public solicitando = false;
    public parametros:any={};

  constructor(public activeModal: NgbActiveModal,
              public api: ApiRequestService,
              public apiRequest: ApiRequestService,
              private modalService: NgbModal,
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

    }
    confirmarEliminacion(ubigeo):void{
        this.vistaFormulario= true;
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
        this.cargando=true;
        this.api.post("ubigeo",this.ubigeo)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.ubigeo = respuesta.extraInfo;
                    this.cargando=false;
                } else {
                    this.cargando=false;
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    }

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
            this.cargando = false;
    }

    elegirUbigeo(o){
        this.activeModal.close(o);
    }

    nuevo(){
        this.vistaFormulario = true;
        this.cargando = true;
        this.ubigeo = new Ubigeo();
        this.cargando = false;
    }

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
    }

    private handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');
        this.cargando =false;
    }
}
