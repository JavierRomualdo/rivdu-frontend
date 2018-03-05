import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { LS } from '../../app-constants';
import { Empresa } from '../../entidades/entidad.empresa';
import {Persona} from '../../entidades/entidad.persona';
import {EmpresaComponent} from '../../empresa/empresa.component';
import {ModalGerenteComponent} from '../../empresa/modal-gerente/modal-gerente.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalUbigeoComponent } from '../../mantenimiento-captacion/modal-ubigeo/modal-ubigeo.component';

@Component({
  selector: 'app-modal-empresa',
  templateUrl: './modal-empresa.component.html',
  styleUrls: ['./modal-empresa.component.css']
})
export class ModalEmpresaComponent implements OnInit {

  public ruc:string;
  public empresa:Empresa;
  public persona:Persona;
  constructor(
    public activeModal: NgbActiveModal,
    public api: ApiRequestService,
    public toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.empresa = new Empresa();
    this.persona= new Persona();
  }
  ngOnInit() {
    this.ruc = localStorage.getItem(LS.KEY_RUC_EMPRESA);
    this.traerEmpresa();
  }
  traerEmpresa(){
    this.api.get("empresa/validar/"+this.ruc)
      .then(respuesta => {
        if(respuesta && respuesta.extraInfo){
          this.empresa = respuesta.extraInfo;
        }else{
          this.toastr.error(respuesta.operacionMensaje, 'Error');
        }
      })
      .catch(err => this.handleError(err));
  }
  abrirpersona():void{
    const modalRef = this.modalService.open(ModalGerenteComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }
  ubigeo():void{
    const modalRef = this.modalService.open(ModalUbigeoComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }
  actualizarEmpresa(){
    this.api.post("empresa",this.empresa)
      .then(respuesta => {
        if(respuesta && respuesta.extraInfo){
          this.empresa = respuesta.extraInfo;
          this.activeModal.close(this.empresa);
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
