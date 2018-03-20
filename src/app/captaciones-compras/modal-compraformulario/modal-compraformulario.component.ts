import { Ubigeo } from './../../entidades/entidad.ubigeo';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../servicios/auth.service';
import {ApiRequestService} from '../../servicios/api-request.service';
import { Estadocliente } from '../../entidades/entidad.estadocliente';
import {ToastrService} from 'ngx-toastr';
import { ModalUbigeoComponent } from '../../mantenimiento-captacion/modal-ubigeo/modal-ubigeo.component';

@Component({
  selector: 'app-modal-compraformulario',
  templateUrl: './modal-compraformulario.component.html',
  styleUrls: ['./modal-compraformulario.component.css']
})
export class ModalCompraformularioComponent implements OnInit {

  public  lista:any=[];
  public ubigeo = new Ubigeo();

  constructor(
    public activeModal: NgbActiveModal,
    public authService: AuthService,
    public api: ApiRequestService,
    private modalService: NgbModal,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.listarestados();
  }

  listarestados(){
        this.api.get("estadocivil/listar")
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.lista = respuesta.extraInfo;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));

    }

    handleError(error: any): void {
      this.toastr.error("Error Interno", 'Error');
    }

    abrirModalUbigeo():void{
      const modalRef = this.modalService.open(ModalUbigeoComponent, {size: 'sm', keyboard: false});
      modalRef.result.then((result) => {
          this.ubigeo = result;
          console.log("Ha sido cerrado "+result);
      }, (reason) => {
          console.log("Ha sido cerrado "+reason);
      });
    };
}
