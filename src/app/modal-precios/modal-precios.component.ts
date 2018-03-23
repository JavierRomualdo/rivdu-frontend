import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-precios',
  templateUrl: './modal-precios.component.html',
  styleUrls: ['./modal-precios.component.css']
})
export class ModalPreciosComponent implements OnInit {
  public listaProyectos: any;

  constructor(
    public activeModal: NgbActiveModal,
    public api: ApiRequestService,
    public toastr: ToastrService,
    private modal: NgbModal
  ) { }

  ngOnInit() {
  }

  listarStatus() {
        this.api.get("proyecto/listar")
            .then(respuesta => {
                if (respuesta && respuesta.extraInfo) {
                    this.listaProyectos = respuesta.extraInfo;
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
