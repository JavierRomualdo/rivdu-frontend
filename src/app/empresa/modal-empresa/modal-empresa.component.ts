import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { AuthService } from '../../servicios/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LS } from '../../app-constants';
import { Empresa } from '../../entidades/entidad.empresa';
import { Persona } from '../../entidades/entidad.persona';
import { Ubigeo } from '../../entidades/entidad.ubigeo';
import { ModalIngenierosComponent } from '../modal-ingenieros/modal-ingenieros.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalUbigeoComponent } from '../../mantenimiento-captacion/modal-ubigeo/modal-ubigeo.component';

@Component({
  selector: 'app-modal-empresa',
  templateUrl: './modal-empresa.component.html',
  styleUrls: ['./modal-empresa.component.css']
})
export class ModalEmpresaComponent implements OnInit {
  cargando:boolean=false;
  componenteIsTrue: boolean=false;
  public ruc:string;
  public empresa:Empresa;
  public persona:Persona;

  constructor(public activeModal:NgbActiveModal,
              public api:ApiRequestService,
              public auth:AuthService,
              public toastr:ToastrService,
              private modalService:NgbModal) {
    this.empresa = new Empresa();
    this.empresa.idubigeo = new Ubigeo();
    this.empresa.idgerente = new Persona();
    this.persona = new Persona();
  }

  ngOnInit() {
    this.ruc = localStorage.getItem(LS.KEY_RUC_EMPRESA);
    this.traerEmpresa();
  }

  traerEmpresa() {
    this.cargando=true
    this.api.get("empresa/validar/" + this.ruc)
        .then(respuesta => {
          if (respuesta && respuesta.extraInfo) {
            this.empresa = respuesta.extraInfo;
            if (!this.empresa.idubigeo){
              this.empresa.idubigeo = new Ubigeo();
            }
            if (!this.empresa.idgerente){
              this.empresa.idgerente= new Persona();
            }
            this.cargando= false;
          } else {
            this.toastr.error(respuesta.operacionMensaje, 'Error');
          } this.cargando= false;
        })
        .catch(err => this.handleError(err));
  }

  abrirpersona():void {
    const modalRef = this.modalService.open(ModalIngenierosComponent, {windowClass:'nuevo-modal', size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
      this.empresa.idgerente= result;
      this.auth.agregarmodalopenclass();
    }, (reason) => {
      this.auth.agregarmodalopenclass();
    });
  }
  ubigeo():void {
    const modalRef = this.modalService.open(ModalUbigeoComponent, {windowClass:'nuevo-modal', size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
      this.empresa.idubigeo = result;
      this.auth.agregarmodalopenclass();
    }, (reason) => {
      this.auth.agregarmodalopenclass();
    });
  }

  actualizarEmpresa() {
    this.cargando = true;
    if(this.empresa.idgerente && !this.empresa.idgerente.id){
      this.empresa.idgerente=null;
    }
    if(this.empresa.idubigeo && !this.empresa.idubigeo.id){
      this.empresa.idubigeo=null;
    }

    this.api.post("empresa", this.empresa)
        .then(respuesta => {
          if (respuesta && respuesta.extraInfo) {
            this.empresa = respuesta.extraInfo;
            this.activeModal.close(this.empresa);
          } else {
            this.toastr.error(respuesta.operacionMensaje, 'Error');
          }
          this.cargando = false;
        })
        .catch(err => this.handleError(err));
  }

  private handleError(error:any):void {
    this.cargando = false;
    this.toastr.error("Error Interno", 'Error');
  }
}
