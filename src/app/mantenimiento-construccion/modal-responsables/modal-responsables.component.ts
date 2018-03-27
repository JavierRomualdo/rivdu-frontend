import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiRequestService} from '../../servicios/api-request.service';
import {ToastrService} from 'ngx-toastr';
import {Responsable} from '../../entidades/entidad.responsable';
import {ModalEstadocivilComponent} from "../../mantenimiento-captacion/modal-estadocivil/modal-estadocivil.component";

@Component({
  selector: 'app-modal-responsables',
  templateUrl: './modal-responsables.component.html',
  styleUrls: ['./modal-responsables.component.css']
})
export class ModalResponsablesComponent implements OnInit {

    public cambiartitulo:boolean=false;
    public clicknuevo:boolean=false;
    public cargando:boolean=false;
    public listado:boolean=false;
    public  lista:any=[];

    public responsable:Responsable;

  constructor(public activeModal: NgbActiveModal,
              public api: ApiRequestService,
              public toastr: ToastrService,
              public modal: NgbModal,
              private modalService: NgbModal) {
    this.responsable = new Responsable();


  }

  ngOnInit() {
  }

  /*  listarModalResponsable(){
        this.cargando=true;
        this.api.get("responsable/listar")
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
        const modalRef = this.modalService.open(ModalEstadocivilComponent, {size: 'lg', keyboard: false});
        modalRef.result.then((result) => {
        }, (reason) => {
        });

    };

    abrirModalListado(){
        this.clicknuevo=false;
        this.cambiartitulo=false;

    };

    guardarDatosNuevoModal(){
        this.cargando=true;
        this.api.post("responsable",this.responsable)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.responsable = respuesta.extraInfo;
                    this.toastr.success("Registro guardado exitosamente", 'Exito');
                    this.cargando = false;
                    this.listado = true;
                    this.abrirModalListado();
                    this.listarModalResponsable();

                } else {
                    this.cargando=false;
                    this.toastr.error(respuesta.operacionMensaje, 'Error');

                }
            })
            .catch(err => this.handleError(err));
    };

*/
    private handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');
        this.cargando = false;
    }

}
