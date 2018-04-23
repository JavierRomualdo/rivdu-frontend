import { Component, OnInit } from '@angular/core';
import { NgbModal , NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-modal-rol',
  templateUrl: './modal-rol.component.html',
  styleUrls: ['./modal-rol.component.css']
})
export class ModalRolComponent implements OnInit {

  public tiposroles:any;
  public idRol:any;

  constructor( public activeModal: NgbActiveModal,
               public api: ApiRequestService, public toastr: ToastrService,
               private modalService: NgbModal) {

  }

  ngOnInit() {
      this.traertiposrol();
  }
    traertiposrol(){
        this.api.get("tiposroles/listar")
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.tiposroles = respuesta.extraInfo;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    }

    elegir(rol){
      this.activeModal.close(rol);
    }

    private handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');

    }

}
