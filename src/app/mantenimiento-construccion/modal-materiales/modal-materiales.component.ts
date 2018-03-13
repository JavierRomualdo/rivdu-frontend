import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiRequestService} from '../../servicios/api-request.service';
import {ToastrService} from 'ngx-toastr';
import {Materiales} from '../../entidades/entidad.materiales';
import {ConfirmacionComponent} from '../../util/confirmacion/confirmacion.component';

@Component({
  selector: 'app-modal-materiales',
  templateUrl: './modal-materiales.component.html',
  styleUrls: ['./modal-materiales.component.css']
})
export class ModalMaterialesComponent implements OnInit {

    public cambiartitulo:boolean=false;
    public clicknuevo:boolean=false;
    public cargando:boolean=false;
    public listado:boolean=false;
    public  lista:any=[];

    public materiales:Materiales ;


  constructor(public activeModal: NgbActiveModal, public api: ApiRequestService,
              public toastr: ToastrService, public modal: NgbModal) {

      this.materiales = new Materiales();
}

  ngOnInit() {
    this.listarModalMateriales();
  }

    listarModalMateriales(){
        this.cargando=true;
        this.api.get("materiales/listar")
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

    confirmarEliminado(li): void {
        const modalRef = this.modal.open(ConfirmacionComponent, {size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.eliminarEstado(li);
            this.toastr.success("Registro eliminado exitosamente", 'Exito');
        }, (reason) => {
        });
    };

    private handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');
        this.cargando = false;
    }

}
