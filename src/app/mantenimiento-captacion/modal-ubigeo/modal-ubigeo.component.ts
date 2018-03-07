import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { LS } from  '../../app-constants';
import { Ubigeo } from '../../entidades/entidad.ubigeo';
import {Tipoubigeo } from  '../../entidades/entidad.tipoubigeo';

@Component({
  selector: 'app-modal-ubigeo',
  templateUrl: './modal-ubigeo.component.html',
  styleUrls: ['./modal-ubigeo.component.css']
})
export class ModalUbigeoComponent implements OnInit {

  public ubigeo:Ubigeo;
  public  tipos:any=[];
  public cargando:boolean=false;

  constructor(public activeModal: NgbActiveModal,
              public api: ApiRequestService,
              public toastr: ToastrService) {
      this.ubigeo=new Ubigeo();
  }

  ngOnInit() {
     this.traertipos();
  }

    guardarubigeo(){
        this.cargando=true;
        this.api.post("ubigeo",this.ubigeo)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.ubigeo = respuesta.extraInfo;
                    this.toastr.success("Registro guardado exitosamente", 'Exito');
                    this.activeModal.close(this.ubigeo);
                    this.cargando=false;
                } else {
                    this.cargando=false;
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    }

    traertipos(){
        this.api.get("tipoubigeo/listar")
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.tipos = respuesta.extraInfo;
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
