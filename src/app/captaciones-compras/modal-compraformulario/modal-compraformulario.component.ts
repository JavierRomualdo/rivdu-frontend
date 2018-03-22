import { Ubigeo } from './../../entidades/entidad.ubigeo';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../servicios/auth.service';
import {ApiRequestService} from '../../servicios/api-request.service';
import { Estadocliente } from '../../entidades/entidad.estadocliente';
import { Relacion } from '../../entidades/entidad.relacion';
import { Persona } from '../../entidades/entidad.persona';
import {ToastrService} from 'ngx-toastr';
import { ModalUbigeoComponent } from '../../mantenimiento-captacion/modal-ubigeo/modal-ubigeo.component';
import { ModalIngenierosComponent } from '../../empresa/modal-ingenieros/modal-ingenieros.component';

@Component({
  selector: 'app-modal-compraformulario',
  templateUrl: './modal-compraformulario.component.html',
  styleUrls: ['./modal-compraformulario.component.css']
})
export class ModalCompraformularioComponent implements OnInit {

  public  lista=[];
  public relacion:Relacion[];
  public personaCompra1:any[];
  public personaCompra2:any[];
  public rel:Relacion;
  public cargando:boolean =false;
  public ubigeo:Ubigeo;
  public persona:Persona;
  public relacionPropietario:any[];

  constructor(
    public activeModal: NgbActiveModal,
    public authService: AuthService,
    public api: ApiRequestService,
    public auth: AuthService,
    private modalService: NgbModal,
    private modal:NgbModal,
    public toastr: ToastrService
  ) {
      this.rel = new Relacion();
      this.ubigeo= new Ubigeo();
      this.persona =new Persona();
  }

  ngOnInit() {
    this.listarestados();
    this.listarRelacionParentesco();
  }

  listarestados(){
      this.cargando = true;
        this.api.get("estadocivil/listar")
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.lista = respuesta.extraInfo;
                    this.cargando =false;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                    this.cargando = false;
                }
            })
            .catch(err => this.handleError(err));
            this.cargando = false;
    }

  listarRelacionParentesco(){
        this.cargando = true;
        this.api.get("relacion/listar")
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.relacion = respuesta.extraInfo;
                    this.cargando = false;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                    this.cargando= false;
                }
            })
            .catch(err => this.handleError(err));
            this.cargando = false;


    };

  abrirModalPersona():void{
      const modalRef = this.modal.open(ModalIngenierosComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.persona = result;
            this.auth.agregarmodalopenclass();
            console.log("Ha sido cerrado "+result);
        }, (reason) => {
            console.log("Ha sido cerrado "+reason);
            this.auth.agregarmodalopenclass();
        });
    };

    abrirModalPropietario():void{
        const modalRef = this.modal.open(ModalIngenierosComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            if(result.id==this.persona.id){
               this.toastr.warning("No se puede apilar");
            }else{
                //lisytr,oush(result);
                this.relacionPropietario.push(result);
            }
            this.auth.agregarmodalopenclass();
            console.log("Ha sido cerrado "+result);
        }, (reason) => {
            console.log("Ha sido cerrado "+reason);
            this.auth.agregarmodalopenclass();
        });
    };

    handleError(error: any): void {
      this.toastr.error("Error Interno", 'Error');
      this.cargando =false;
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
