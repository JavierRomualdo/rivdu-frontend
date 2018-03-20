import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiRequestService} from '../../servicios/api-request.service';
import {ToastrService} from 'ngx-toastr';
import {Labores} from '../../entidades/entidad.labores';
import {AuthService}  from '../../servicios/auth.service';
import {ConfirmacionComponent} from '../../util/confirmacion/confirmacion.component';

@Component({
  selector: 'app-modal-labores',
  templateUrl: './modal-labores.component.html',
  styleUrls: ['./modal-labores.component.css']
})
export class ModalLaboresComponent implements OnInit {

    public cambiartitulo:boolean=false;
    public clicknuevo:boolean=false;
    public cargando:boolean=false;
    public listado:boolean=false;
    public  lista:any=[];

    public labores:Labores ;
    //Estado(Habilitado/Deshabilitadoo)
    public confirmarcambioestado:boolean=false;

    //Variables para Modificacion de un Material
    public verNuevo:boolean = false;

  constructor(public activeModal: NgbActiveModal,
              public api: ApiRequestService,
              public toastr: ToastrService,
              public modal: NgbModal,
              private modalService: NgbModal,
              public auth: AuthService,
              private apiRequest: ApiRequestService) {

      this.labores = new Labores();
  }

  ngOnInit() {
    this.listarModalLabores();
  }

    listarModalLabores(){
        this.cargando=true;
        this.api.get("labores/listar")
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.lista = respuesta.extraInfo;
                    this.cargando=false;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                    this.cargando = false;
                }
            })
            .catch(err => this.handleError(err));

    };

    abriNuevoModalNuevo(){
        this.clicknuevo=true;
        this.cambiartitulo=true;

    };

    abrirModalListado(){
        this.clicknuevo=false;
        this.cambiartitulo=false;

    };

    guardarDatosNuevoModal(){
        this.cargando=true;
        this.api.post("labores",this.labores)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.labores = respuesta.extraInfo;
                    this.toastr.success("Registro guardado exitosamente", 'Exito');
                    this.cargando = false;
                    this.listado = true;
                    this.abrirModalListado();
                    this.listarModalLabores();

                } else {
                    this.cargando=false;
                    this.toastr.error(respuesta.operacionMensaje, 'Error');

                }
            })
            .catch(err => this.handleError(err));
    };

    confirmarCambioDeEstado(labor):void{
        const modalRef = this.modalService.open(ConfirmacionComponent,{windowClass:'nuevo-modal'});
        modalRef.result.then((result) => {
            this.confirmarcambioestado = true;
            this.cambiarEstadoLabor(labor);
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            labor.estado = !labor.estado;
            this.auth.agregarmodalopenclass();
        });
    };

    cambiarEstadoLabor(labor){
        this.cargando = true;
        return this.apiRequest.post('labores/eliminarConEstado', {id:labor.id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.toastr.success(data.operacionMensaje," Exito");
                        this.listarModalLabores();
                    } else {
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                    this.cargando = false;
                }
            )
            .catch(err => this.handleError(err));
    };

    //Modificar 1 Material
    traerParaEdicion(id){
        this.cargando = true;
        this.clicknuevo = true;
        this.verNuevo = true;
        return this.apiRequest.post('labores/obtener', {id:id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.cargando = false;
                        this.labores = data.extraInfo;
                    }
                    else{
                        this.toastr.info(data.operacionMensaje,"Informacion");
                        this.clicknuevo = false;
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
