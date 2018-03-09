import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Relacion} from '../../entidades/entidad.relacion';
import {ConfirmacionComponent} from '../../util/confirmacion/confirmacion.component';
import {ApiRequestService} from '../../servicios/api-request.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-modal-relacionpersonal',
  templateUrl: './modal-relacionpersonal.component.html',
  styleUrls: ['./modal-relacionpersonal.component.css']
})
export class ModalRelacionpersonalComponent implements OnInit {

    public relacioncliente: Relacion;
    public  lista:any=[];
    public cargando:boolean=false;
    public clicknuevo:boolean=false;
    public clickeditar:boolean=false;
    public listado:boolean=false;
    public id:number;
    public listaestado:any;


    constructor( public activeModal: NgbActiveModal, public api: ApiRequestService,
                 public toastr: ToastrService, public modal: NgbModal) {
        this.relacioncliente = new Relacion();
    }

    ngOnInit() {
        this.listarrelaciones();
    }

    listarrelaciones(){
        this.cargando=true;
        this.api.get("relacion/listar")
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.lista = respuesta.extraInfo;
                    this.cargando=false;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));

    };

    eliminarrelacion(li){
        this.api.delete("relacion/eliminarestadocliente/"+li.id)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.lista.splice(this.lista.lastIndexOf(li),1);
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    };

    guardarrelacion(){
        this.cargando=true;
        this.api.post("relacion",this.relacioncliente)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.relacioncliente = respuesta.extraInfo;
                    this.toastr.success("Registro guardado exitosamente", 'Exito');
                    this.cargando = false;
                    this.listado = true;
                    this.listarrelaciones();
                    this.abrirlistado();
                } else {
                    this.cargando=false;
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    };


    abrinuevarelacion(){
        this.clicknuevo=true;
        this.relacioncliente=new Relacion();
    };

    abrirlistado(){
        this.clicknuevo=false;
        this.clickeditar=false;

    };

    confirmareliminado(li): void {
        const modalRef = this.modal.open(ConfirmacionComponent, {size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.eliminarrelacion(li);
            this.toastr.success("Registro eliminado exitosamente", 'Exito');
        }, (reason) => {
        });
    };

    traerParaEdicion(id){
        this.clickeditar=true;
        this.clicknuevo=false;
        return this.api.post('relacion/obtener', {id: id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.relacioncliente = data.extraInfo;

                    }
                    else{
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                }
            )
            .catch(err => this.handleError(err));
    }

    editarestado(li):void{
        this.clickeditar=true;

    }
    probar():void{
        alert("Hola");
    }
    private handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');
    }


}
