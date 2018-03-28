import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiRequestService} from '../../servicios/api-request.service';
import {ToastrService} from 'ngx-toastr';
import {Materiales} from '../../entidades/entidad.materiales';
import {ConfirmacionComponent} from '../../util/confirmacion/confirmacion.component';
import {AuthService}  from '../../servicios/auth.service';
import { Paginacion } from '../../entidades/entidad.paginacion';

@Component({
  selector: 'app-modal-materiales',
  templateUrl: './modal-materiales.component.html',
  styleUrls: ['./modal-materiales.component.css']
})
export class ModalMaterialesComponent implements OnInit {

    public cambiartitulo: boolean = false;
    public clicknuevo: boolean = false;
    public cargando: boolean = false;
    public listado: boolean = false;
    public lista: any = [];

    //Estado(Habilitado/Deshabilitadoo)
    public confirmarcambioestado:boolean=false;

    //Variables para realizar la Paginacion
    public page: number = 1;
    public paginacion: Paginacion;

    //Variables para realizar la Busqueda
    public codigo:string="";
    public detalle:string="";
    public parametros:any={};

    //Variables para Modificacion de un Material
    public vistaFormulario = false;
    public verNuevo:boolean = false;

    public materiales:Materiales ;

  constructor(public activeModal: NgbActiveModal,
              public api: ApiRequestService,
              public toastr: ToastrService,
              public modal: NgbModal,
              private modalService: NgbModal,
              public auth: AuthService,
              private apiRequest: ApiRequestService) {

      this.materiales = new Materiales();
      this.paginacion = new Paginacion();
}
  ngOnInit() {
    this.listarModalMateriales();
  }

    busqueda(): void {
        this.page = 1;
        this.parametros = {
            "detalle":this.detalle
        };
        this.listarModalMateriales();
    };

    listarModalMateriales(){
        this.cargando=true;
        this.api.post('materiales/pagina/'+this.page+'/cantidadPorPagina/'+this.paginacion.cantidadPorPagina, this.parametros)
            .then(data => {
                if(data){
                    this.cargando = false;
                    this.paginacion.totalRegistros = data.totalRegistros;
                    this.paginacion.paginaActual = data.paginaActual;
                    this.paginacion.totalPaginas = data.totalPaginas;
                    this.lista= data.registros;
                }
            })
            .catch(err => this.handleError(err));

    };


    abriNuevoModalNuevo(){
        this.vistaFormulario=true;
        this.cambiartitulo=true;
        this.materiales=new Materiales();
    };

    abrirModalListado(){
        this.vistaFormulario=false;
        this.cambiartitulo=false;

    };

    guardarDatosNuevoModal(){
        this.cargando=true;
        this.api.post("materiales",this.materiales)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.materiales = respuesta.extraInfo;
                    this.toastr.success("Registro guardado exitosamente", 'Exito');
                    this.cargando = false;
                    this.listado = true;
                    this.abrirModalListado();
                    this.listarModalMateriales();

                } else {
                    this.cargando=false;
                    this.toastr.error(respuesta.operacionMensaje, 'Error');

                }
            })
            .catch(err => this.handleError(err));
    };

    eliminarEstado(li){
        this.api.delete("materiales/eliminarEstadoMaterial/"+li.id)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.lista.splice(this.lista.lastIndexOf(li),1);
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    };

    // Eliminado
    confirmarEliminado(li): void {
        const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.eliminarEstado(li);
            this.toastr.success("Registro eliminado exitosamente", 'Exito');
        }, (reason) => {
        });
    };

    cambiarEstadoMaterial(material){
        this.cargando = true;
        return this.apiRequest.post('materiales/eliminarConEstado', {id:material.id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.toastr.success(data.operacionMensaje," Exito");
                        this.listarModalMateriales();
                    } else {
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                    this.cargando = false;
                }
            )
            .catch(err => this.handleError(err));
    };

    confirmarCambioDeEstado(material):void{
        const modalRef = this.modalService.open(ConfirmacionComponent,{windowClass:'nuevo-modal'});
        modalRef.result.then((result) => {
            this.confirmarcambioestado=true;
            this.cambiarEstadoMaterial(material);
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            material.estado = !material.estado;
            this.auth.agregarmodalopenclass();
        });
    };

    //Modificar 1 Material
    traerParaEdicion(id){
        this.cargando = true;
        this.vistaFormulario = true;
        this.verNuevo = true;
        return this.apiRequest.post('materiales/obtener', {id:id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.cargando = false;
                        this.materiales = data.extraInfo;
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

    private handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');
        this.cargando = false;
    };

}
