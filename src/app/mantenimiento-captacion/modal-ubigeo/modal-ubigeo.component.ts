import { Component, OnInit } from '@angular/core';
import { Paginacion } from '../../entidades/entidad.paginacion';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
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

    guardarubigeo(){
        this.cargando=true;
        this.api.post("ubigeo",this.ubigeo)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.ubigeo = respuesta.extraInfo;
                    this.toastr.success("Registro guardado exitosamente", 'Exito');
                    this.activeModal.close(this.ubigeo);
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
                    this.solicitando = false;
                    this.paginacion.totalRegistros = data.totalRegistros;
                    this.paginacion.paginaActual = data.paginaActual;
                    this.paginacion.totalPaginas = data.totalPaginas;
                    this.ubigeos = data.registros;
                    this.cargando= false;
                }
            })
            .catch(err => this.handleError(err));
    }

    elegirUbigeo(o){
        this.activeModal.close(o);
    }

    nuevo(){
        this.vistaFormulario = true;
        this.ubigeo = new Ubigeo();
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
    }
}
