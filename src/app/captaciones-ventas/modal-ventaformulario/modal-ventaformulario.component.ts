import { Personacompra } from './../../entidades/entidad.personacompra';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../servicios/auth.service';
import { ApiRequestService } from '../../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { Persona } from '../../entidades/entidad.persona';
import { ModalIngenierosComponent } from '../../empresa/modal-ingenieros/modal-ingenieros.component';
import { ModalUbigeoComponent } from '../../mantenimiento-captacion/modal-ubigeo/modal-ubigeo.component';
import { ModalPreciosComponent } from '../../modal-precios/modal-precios.component';
import { Ubigeo } from '../../entidades/entidad.ubigeo';
import { Personaventa } from "../../entidades/entidad.personaventa";
import { Venta } from "../../entidades/entidad.venta";

import { Relacion } from '../../entidades/entidad.relacion';
import { ConfirmacionComponent } from "../../util/confirmacion/confirmacion.component";
import { Savecompradto } from "../../entidades/entidad.savecompradto";
import { Predio } from "../../entidades/entidad.predio";
import { Captador } from "../../entidades/entidad.captador";
import { Colindante } from "../../entidades/entidad.colindante";
import { Servicio } from "../../entidades/entidad.servicio";

@Component({
    selector: 'app-modal-ventaformulario',
    templateUrl: './modal-ventaformulario.component.html',
    styleUrls: ['./modal-ventaformulario.component.css']
})
export class ModalVentaformularioComponent implements OnInit {
    @Input() edit;
    public relacion: Relacion[] = [];
    public propietarioList: Personaventa[] = [];
    public allegadosList: Personaventa[] = [];
    public rel: Relacion;
    public cargando: boolean = false;
    public vistaFormulario: boolean = false;
    public ubigeo: Ubigeo;
    public predio: Predio;
    public todocompra: Savecompradto;
    public captador: Captador;
    public colindante: Colindante;
    public servicios: Servicio[] = [];
    public persona: Persona;
    public idpersona: Persona;
    selectedServicios: string[] = [];

    public listaProgramas = [];
    public precioTerreno = 0.00;
    public venta: Venta;

    constructor(
        public activeModal: NgbActiveModal,
        public auth: AuthService,
        public api: ApiRequestService,
        public toastr: ToastrService,
        private modal: NgbModal
    ) {
        this.persona = new Persona();
        this.ubigeo = new Ubigeo();
        this.rel = new Relacion();
        this.ubigeo = new Ubigeo();
        this.venta = new Venta();
        this.captador = new Captador();
        this.predio = new Predio();
        this.predio.idubigeo = new Ubigeo();
        this.colindante = new Colindante();
        this.todocompra = new Savecompradto();
    }

    ngOnInit() {
        this.listarprogramas();
        this.listarRelacionParentesco();
        this.listarServicios();
    }

    abrirModalPropietario(): void {
        const modalRef = this.modal.open(ModalIngenierosComponent, { windowClass: 'nuevo-modal', size: 'lg', keyboard: false });
        modalRef.result.then((result) => {
            let puedeSerSeleccionado = true;
            this.propietarioList = [];
            let propietario = new Personaventa();
            propietario.id = null;
            propietario.idventa = this.venta.id;
            propietario.estado = true;
            for (let i = 0; i < this.allegadosList.length; i++) {
                if (this.allegadosList[i].idpersona.id == result.id) {
                    this.toastr.warning("Persona ya se encuentra seleccionada.", "Aviso");
                    puedeSerSeleccionado = false;
                    break;
                }
            }
            if (puedeSerSeleccionado) {
                propietario.idpersona = result;
                this.propietarioList.push(propietario);
                this.persona = result;
            }
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            this.auth.agregarmodalopenclass();
        });
    }

    listarRelacionParentesco() {
        this.api.get("relacion/listar")
            .then(respuesta => {
                if (respuesta && respuesta.extraInfo) {
                    this.relacion = respuesta.extraInfo;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    };

    listarServicios() {
        if (JSON.parse(localStorage.getItem("servicios"))) {
            this.servicios = JSON.parse(localStorage.getItem("servicios"));
        } else {
            this.api.get("servicios/listar")
                .then(respuesta => {
                    if (respuesta && respuesta.extraInfo) {
                        this.servicios = respuesta.extraInfo;
                        localStorage.setItem("servicios", JSON.stringify(this.servicios));
                    } else {
                        this.toastr.error(respuesta.operacionMensaje, 'Error');
                    }
                })
                .catch(err => this.handleError(err));
        }
    };

    listarprogramas() {
        this.cargando = true;
        this.api.get("programas/listar")
            .then(respuesta => {
                if (respuesta && respuesta.extraInfo) {
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
        const modalRef = this.modal.open(ModalUbigeoComponent, { windowClass: 'nuevo-modal', size: 'lg', keyboard: false });
        modalRef.result.then((result) => {
            this.predio.idubigeo = result;
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            this.auth.agregarmodalopenclass();
        });
    };

    abrirModalAllegados(): void {
        const modalRef = this.modal.open(ModalIngenierosComponent, { windowClass: 'nuevo-modal', size: 'lg', keyboard: false });
        modalRef.result.then((result) => {
            if (result.id == this.persona.id || this.validarRepetidos(result)) {
                this.toastr.warning("Esta persona ha sido elegida como el titular de la compra");
            } else {
                let relacionPropietario = new Personaventa();
                relacionPropietario.id = null;
                relacionPropietario.estado = true;
                relacionPropietario.idventa = this.venta.id;
                relacionPropietario.idpersona = result;
                this.allegadosList.push(relacionPropietario);
            }
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            this.auth.agregarmodalopenclass();
        });
    };

    validarRepetidos(result) {
        var rpt = false;
        for (let i = 0; i < this.allegadosList.length; i++) {
            if (this.allegadosList[i].idpersona.id == result.id) {
                rpt = true;
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
