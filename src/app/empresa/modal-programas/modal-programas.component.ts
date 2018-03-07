import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { LS } from '../../app-constants';
import { Programas } from '../../entidades/entidad.programas';

@Component({
  selector: 'app-modal-programas',
  templateUrl: './modal-programas.component.html',
  styleUrls: ['./modal-programas.component.css']
})
export class ModalProgramasComponent implements OnInit {

    public programa:Programas;
    public cargando:boolean=false;

    constructor(public activeModal: NgbActiveModal,
                public api: ApiRequestService,
                public toastr: ToastrService) {
        this.programa = new Programas();
    }

    guardarProgramas(){
        this.cargando=true;
        this.api.post("programas",this.programa)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.programa = respuesta.extraInfo;
                    this.toastr.success("Registro guardado exitosamente", 'Exito');
                    this.activeModal.close(this.programa);
                    this.cargando=false;
                } else {
                    this.cargando=false;
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    }

    private handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');
    }

}
