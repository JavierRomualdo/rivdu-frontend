import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { LS } from '../../app-constants';
import { Empresa } from '../../entidades/entidad.empresa';

@Component({
  selector: 'app-modal-empresa',
  templateUrl: './modal-empresa.component.html',
  styleUrls: ['./modal-empresa.component.css']
})
export class ModalEmpresaComponent implements OnInit {

  public ruc:string;
  public empresa:Empresa;

  constructor(
    public activeModal: NgbActiveModal,
    public api: ApiRequestService,
    public toastr: ToastrService
  ) {
    this.empresa = new Empresa();
  }

  ngOnInit() {
    this.ruc = localStorage.getItem(LS.KEY_RUC_EMPRESA);
    this.traerEmpresa();
  }

  traerEmpresa(){
    this.api.get("empresa/validar/"+this.ruc)
      .then(respuesta => {
        if(respuesta && respuesta.extraInfo){
          this.toastr.success(respuesta.operacionMensaje, 'Exito');
          this.empresa = respuesta.extraInfo;
        }else{
          this.toastr.error(respuesta.operacionMensaje, 'Error');
        }
      })
      .catch(err => this.handleError(err));
  }

  private handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
  }

}
