import { Personacompra } from './../../entidades/entidad.personacompra';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../servicios/auth.service';
import {ApiRequestService} from '../../servicios/api-request.service';
import {ToastrService} from 'ngx-toastr';
import { Persona } from '../../entidades/entidad.persona';
import { ModalIngenierosComponent } from '../../empresa/modal-ingenieros/modal-ingenieros.component';
import { ModalUbigeoComponent } from '../../mantenimiento-captacion/modal-ubigeo/modal-ubigeo.component';
import { ModalPreciosComponent } from '../../modal-precios/modal-precios.component';
import { Ubigeo } from '../../entidades/entidad.ubigeo';
import { Personaventa} from "../../entidades/entidad.personaventa";
import {Venta} from "../../entidades/entidad.venta";

@Component({
  selector: 'app-modal-ventaformulario',
  templateUrl: './modal-ventaformulario.component.html',
  styleUrls: ['./modal-ventaformulario.component.css']
})
export class ModalVentaformularioComponent implements OnInit {
  public persona: Persona;
  public cargando: boolean = false;
  public  listaEstados = [];
  public listaProgramas = [];
  public precioTerreno = 0.00;
  public ubigeo: Ubigeo;
  public listaStatus: any;
    public relacionPropietario: Personaventa[] = [];
    public venta: Venta;

  constructor(
    public activeModal: NgbActiveModal,
    public auth: AuthService,
    public api: ApiRequestService,
    public toastr: ToastrService,
    private modal: NgbModal
  ) {
    this.persona = new Persona();
    this.ubigeo= new Ubigeo();
  }

  ngOnInit() {
    this.listarprogramas();
    this.listarStatus();
  }

  abrirModalPersona():  void {
    const modalRef = this.modal.open(ModalIngenierosComponent, {windowClass: 'nuevo-modal', size: 'sm', keyboard: false});
      modalRef.result.then((result) => {
          this.persona = result;
          this.auth.agregarmodalopenclass();
          console.log("Ha sido cerrado" + result);
      }, (reason) => {
          console.log("Ha sido cerrado" + reason);
          this.auth.agregarmodalopenclass();
      });
  }

  listarestados(){
    this.cargando = true;
      this.api.get("estadocivil/listar")
          .then(respuesta => {
              if (respuesta && respuesta.extraInfo) {
                  this.listaEstados = respuesta.extraInfo;
                  this.cargando = false;
              } else {
                  this.toastr.error(respuesta.operacionMensaje, 'Error');
                  this.cargando = false;
              }
          })
          .catch(err => this.handleError(err));
          this.cargando = false;
  }
    listarprogramas(){
        this.cargando=true;
        this.api.get("programas/listar")
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.listaProgramas = respuesta.extraInfo;
                    this.cargando = false;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                    this.cargando = false;
                }
            })
            .catch(err => this.handleError(err));

    };


  abrirModalUbigeo(): void {
    const modalRef = this.modal.open(ModalUbigeoComponent, {size: 'sm', keyboard: false});
    modalRef.result.then((result) => {
        this.ubigeo = result;
        console.log("Ha sido cerrado "+result);
    }, (reason) => {
        console.log("Ha sido cerrado "+reason);
    });
  };

  abrirModalPrecios(): void {
    const modalRef = this.modal.open(ModalPreciosComponent, {size: 'sm', keyboard: false, windowClass: 'nuevo-modal'});
    modalRef.result.then((result) => {
        //this.ubigeo = result;
        console.log("Ha sido cerrado "+result);
        this.auth.agregarmodalopenclass();
    }, (reason) => {
        console.log("Ha sido cerrado "+reason);
        this.auth.agregarmodalopenclass();
    });
  };

  listarStatus() {
        this.api.get("status/listar")
            .then(respuesta => {
                if (respuesta && respuesta.extraInfo) {
                    this.listaStatus = respuesta.extraInfo;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
  }

    abrirModalPropietarios():void{
        const modalRef = this.modal.open(ModalIngenierosComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            if(result.id==this.persona.id || this.validarRepetidos(result)){
                this.toastr.warning("Esta persona ha sido elegida como el titular de la compra");
            }else{
                let relacionPropietario = new Personaventa();
                relacionPropietario.id=null;
                relacionPropietario.idventa = this.venta.id;
                relacionPropietario.idpersona = result;
                this.relacionPropietario.push(relacionPropietario);
            }
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            this.auth.agregarmodalopenclass();
        });
    };

    validarRepetidos(result){
        var rpt =false;
        for(let i= 0; i < this.relacionPropietario.length; i++){
            if(this.relacionPropietario[i].idpersona.id == result.id){
                rpt= true;
                return rpt;
            }
        }
        return rpt;
    };

  handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
    this.cargando = false;
  }
}
