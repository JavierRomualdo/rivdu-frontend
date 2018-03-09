import { Component, OnInit } from '@angular/core';
import {ApiRequestService} from '../../servicios/api-request.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {Persona} from '../../entidades/entidad.persona';

@Component({
  selector: 'app-modal-captador',
  templateUrl: './modal-captador.component.html',
  styleUrls: ['./modal-captador.component.css']
})
export class ModalCaptadorComponent implements OnInit {

  public cargando : boolean;
  public captador : Persona;
    public  lista : any=[];


  constructor(public activeModal: NgbActiveModal, public api: ApiRequestService,
              public toastr: ToastrService, public modal: NgbModal) {
    this.captador = new Persona();
  }

  ngOnInit() {
  }

    listarestados(){
        this.cargando=true;
        this.api.get("captadores/listar")
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.lista = respuesta.extraInfo;
                    this.cargando=false;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));

    };

    private handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');
    }

}
