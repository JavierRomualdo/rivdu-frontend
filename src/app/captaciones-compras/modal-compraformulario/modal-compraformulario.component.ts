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
import {Compra} from "../../entidades/entidad.compra";
import {Personacompra} from "../../entidades/entidad.personacompra";
import {ConfirmacionComponent} from "../../util/confirmacion/confirmacion.component";

@Component({
  selector: 'app-modal-compraformulario',
  templateUrl: './modal-compraformulario.component.html',
  styleUrls: ['./modal-compraformulario.component.css']
})
export class ModalCompraformularioComponent implements OnInit {

  public  lista=[];
  public relacion:Relacion[];
  public personaCompra1:any=[];
  public personaCompra2:any=[];
  public rel:Relacion;
  public cargando:boolean =false;
  public ubigeo:Ubigeo;
  public compra:Compra;
  public persona:Persona;
  public idpersona:Persona;
  public relacionPropietario:any=[];

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
      this.compra= new Compra();
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


  confirmarEliminacion(o):void{
          const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
      modalRef.result.then((result) => {
          this.quitarPropietario(o);
          this.auth.agregarmodalopenclass();
      }, (reason) => {
          this.auth.agregarmodalopenclass();
      });
  };

    quitarPropietario(o){
        this.relacionPropietario.splice(this.relacionPropietario.indexOf(o),1);
    }
      //this.relacionPropietario =[];
      //this.productos.splice(this.productos.indexOf(producto),1);

  abrirModalPersona():void{
      const modalRef = this.modal.open(ModalIngenierosComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            for(let  i=0 ; i < this.relacionPropietario.length; i++){
                if(this.relacionPropietario[i].idpersona.id ==result.id){
                    this.toastr.warning("Persona ya se encuentra seleccionada");
                }else{
                    //this.persona = result;
                    let personaCompra2 =new Personacompra();
                    personaCompra2.id = null;
                    personaCompra2.idpersona = result;
                    personaCompra2.idcompra = this.compra.id;
                    this.personaCompra2.push(personaCompra2);
                    this.persona= this.personaCompra2[0].idpersona;
                }
            }
            if(this.relacionPropietario.length == 0){
                let personaCompra2 =new Personacompra();
                personaCompra2.id = null;
                personaCompra2.idpersona = result;
                personaCompra2.idcompra = this.compra.id;
                this.personaCompra2.push(personaCompra2);
                this.persona=this.personaCompra2[0].idpersona;
            }
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
            if(result.id==this.persona.id || this.validarRepetidos(result)){
               this.toastr.warning("No se puede apilar");
            }else{
                let relacionPropietario = new Personacompra();
                relacionPropietario.id=null;
                relacionPropietario.idcompra = this.compra.id;
                relacionPropietario.idpersona = result;
                this.relacionPropietario.push(relacionPropietario);
            }
            this.auth.agregarmodalopenclass();
            console.log("Ha sido cerrado "+result);
        }, (reason) => {
            console.log("Ha sido cerrado "+reason);
            this.auth.agregarmodalopenclass();
        });
    };

  validarRepetidos(result){
        var rpt =false;
        for(let i= 0; i < this.relacionPropietario.length; i++){
            if(this.relacionPropietario[i].idpersona.id == result.id){
                this.toastr.warning("Esta persona ya esta seleccionada");
                rpt= true;
                return rpt;
            }
        }
        return rpt;
    };

    handleError(error: any): void {
      this.toastr.error("Error Interno", 'Error');
      this.cargando =false;
    }

    abrirModalUbigeo():void{
      const modalRef = this.modal.open(ModalUbigeoComponent, {windowClass:'nuevo-modal',size: 'sm', keyboard: false});
      modalRef.result.then((result) => {
          this.ubigeo = result;
          this.auth.agregarmodalopenclass();
          console.log("Ha sido cerrado "+result);
      }, (reason) => {
          console.log("Ha sido cerrado "+reason);
          this.auth.agregarmodalopenclass();
      });
    };
}