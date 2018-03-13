import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiRequestService} from '../../servicios/api-request.service';
import {ToastrService} from 'ngx-toastr';
import {Labores} from '../../entidades/entidad.labores';

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

  constructor(public activeModal: NgbActiveModal, public api: ApiRequestService,
              public toastr: ToastrService, public modal: NgbModal) {

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

    private handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');
        this.cargando = false;
    }

}
