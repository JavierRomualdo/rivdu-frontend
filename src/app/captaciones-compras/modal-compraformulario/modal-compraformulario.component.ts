import { Ubigeo } from './../../entidades/entidad.ubigeo';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../servicios/auth.service';
import { ApiRequestService } from '../../servicios/api-request.service';
import { Estadocliente } from '../../entidades/entidad.estadocliente';
import { Relacion } from '../../entidades/entidad.relacion';
import { Persona } from '../../entidades/entidad.persona';
import { ToastrService } from 'ngx-toastr';
import { ModalUbigeoComponent } from '../../mantenimiento-captacion/modal-ubigeo/modal-ubigeo.component';
import { ModalIngenierosComponent } from '../../empresa/modal-ingenieros/modal-ingenieros.component';
import { Compra } from "../../entidades/entidad.compra";
import { Personacompra } from "../../entidades/entidad.personacompra";
import { ConfirmacionComponent } from "../../util/confirmacion/confirmacion.component";
import { Savecompradto } from "../../entidades/entidad.savecompradto";
import { Predio } from "../../entidades/entidad.predio";
import { Captador } from "../../entidades/entidad.captador";
import { Colindante } from "../../entidades/entidad.colindante";
import { Servicio } from "../../entidades/entidad.servicio";

@Component({
    selector: 'app-modal-compraformulario',
    templateUrl: './modal-compraformulario.component.html',
    styleUrls: ['./modal-compraformulario.component.css']
})
export class ModalCompraformularioComponent implements OnInit {

    @Input() edit;
    public relacion: Relacion[] = [];
    public personacompra2: Personacompra[] = [];
    public rel: Relacion;
    public cargando: boolean = false;
    public vistaFormulario: boolean = false;
    public ubigeo: Ubigeo;
    public predio: Predio;
    public compra: Compra;
    public todocompra: Savecompradto;
    public listacompra: Savecompradto;
    public captador: Captador;
    public colindante: Colindante;
    public servicios: Servicio[] = [];
    public persona: Persona;
    public idpersona: Persona;
    public relacionPropietario: Personacompra[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        public authService: AuthService,
        public api: ApiRequestService,
        public apiRequest: ApiRequestService,
        public auth: AuthService,
        private modalService: NgbModal,
        private modal: NgbModal,
        public toastr: ToastrService
    ) {
        this.rel = new Relacion();
        this.ubigeo = new Ubigeo();
        this.persona = new Persona();
        this.compra = new Compra();
        this.captador = new Captador();
        this.predio = new Predio();
        this.predio.idubigeo = new Ubigeo();
        this.captador = new Captador();
        this.colindante = new Colindante();
        this.todocompra = new Savecompradto();
        this.listacompra = new Savecompradto();
    }

    ngOnInit() {
        if (this.edit) {
            this.traerParaEdicion(this.edit);
        }
        this.listarRelacionParentesco();
    };

    traerParaEdicion(id) {
        this.cargando = true;
        this.vistaFormulario = true;
        return this.apiRequest.post('compra/obtener', { id: id })
            .then(
                data => {
                    if (data && data.extraInfo) {
                        this.cargando = false;
                        this.todocompra = data.extraInfo;
                        this.persona = this.todocompra.personacompra[0].idpersona;
                        this.rel = this.todocompra.personacompra[0].idrelacion;
                        this.relacionPropietario = this.todocompra.personacompra2;
                        this.llenarCombo(this.relacionPropietario);
                        //  this.relacionPropietario = this.todocompra.personacompra;
                        //   this.personacompra2 = this.todocompra.personacompra2;
                        this.predio = this.todocompra.predio;
                        this.captador = this.todocompra.captador;
                        this.colindante = this.todocompra.colindante;
                        this.servicios = this.todocompra.servicios;
                    }
                    else {
                        this.toastr.info(data.operacionMensaje, "Informacion");
                        this.vistaFormulario = false;
                        this.cargando = false;
                    }
                }
            )
            .catch(err => this.handleError(err));
    };

    llenarCombo(relacionPropietario) {
        for (let i = 0; i < relacionPropietario.length; i++) {
            let relacion = relacionPropietario[i].idrelacion;
            let relacionselect = this.relacion.find(item => item.id == relacion.id);
            relacionPropietario[i].idrelacion = relacionselect;
        }
    };

    guardarCompra() {
        this.todocompra.personacompra = this.relacionPropietario;
        this.todocompra.personacompra2 = this.personacompra2;
        this.todocompra.predio = this.predio;
        this.todocompra.captador = this.captador;
        this.todocompra.colindante = this.colindante;
        this.todocompra.servicios = this.servicios;
        this.cargando = true;
        if (this.predio.id) {
            return this.api.put("compra/actualizar", this.todocompra)
                .then(respuesta => {
                    if (respuesta && respuesta.extraInfo) {
                        this.todocompra = respuesta.extrainfo;
                        this.toastr.success("Registro guardado exitosamente", 'Exito');
                        this.cargando = false;
                        this.activeModal.close(this.todocompra);
                        this.todocompra = new Savecompradto();
                    } else {
                        this.cargando = false;
                        this.toastr.error(respuesta.operacionMensaje, 'Error');
                    }
                }).catch(err => this.handleError(err));
        } else {
            return this.api.post("compra/guardar", this.todocompra)
                .then(respuesta => {
                    if (respuesta && respuesta.extraInfo) {
                        this.todocompra = respuesta.extraInfo;
                        this.toastr.success("Registro guardado exitosamente", 'Exito');
                        this.cargando = false;
                        this.activeModal.close(this.todocompra);
                    } else {
                        this.cargando = false;
                        this.toastr.error(respuesta.operacionMensaje, 'Error');
                    }
                })
                .catch(err => this.handleError(err));
        }

    };

    listarRelacionParentesco() {
        this.cargando = true;
        this.api.get("relacion/listar")
            .then(respuesta => {
                if (respuesta && respuesta.extraInfo) {
                    this.relacion = respuesta.extraInfo;
                    this.cargando = false;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                    this.cargando = false;
                }
            })
            .catch(err => this.handleError(err));
        this.cargando = false;


    };

    confirmarEliminacion(o): void {
        const modalRef = this.modal.open(ConfirmacionComponent, { windowClass: 'nuevo-modal', size: 'sm', keyboard: false });
        modalRef.result.then((result) => {
            this.quitarPropietario(o);
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            this.auth.agregarmodalopenclass();
        });
    };

    quitarPropietario(o) {
        this.relacionPropietario.splice(this.relacionPropietario.indexOf(o), 1);
    };

    abrirModalPersona(): void {
        const modalRef = this.modal.open(ModalIngenierosComponent, { windowClass: 'nuevo-modal', size: 'lg', keyboard: false });
        modalRef.result.then((result) => {
            for (let i = 0; i < this.relacionPropietario.length; i++) {
                if (this.relacionPropietario[i].idpersona.id == result.id) {
                    this.toastr.warning("Persona ya se encuentra seleccionada.", "Aviso");
                } else {
                    let personaCompra2 = new Personacompra();
                    personaCompra2.id = null;
                    personaCompra2.idpersona = result;
                    personaCompra2.idcompra = this.compra.id;
                    this.personacompra2.push(personaCompra2);
                    this.persona = result;
                }
            }
            if (this.relacionPropietario.length == 0) {
                let personaCompra2 = new Personacompra();
                personaCompra2.id = null;
                personaCompra2.idpersona = result;
                personaCompra2.idcompra = this.compra.id;
                this.personacompra2.push(personaCompra2);
                this.persona = result;
            }
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            this.auth.agregarmodalopenclass();
        });
    };

    abrirModalPropietario(): void {
        const modalRef = this.modal.open(ModalIngenierosComponent, { windowClass: 'nuevo-modal', size: 'lg', keyboard: false });
        modalRef.result.then((result) => {
            if (result.id == this.persona.id || this.validarRepetidos(result)) {
                this.toastr.warning("Esta persona ha sido elegida como el titular de la compra");
            } else {
                let relacionPropietario = new Personacompra();
                relacionPropietario.id = null;
                relacionPropietario.idcompra = this.compra.id;
                relacionPropietario.idpersona = result;
                this.relacionPropietario.push(relacionPropietario);
            }
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            this.auth.agregarmodalopenclass();
        });
    };

    validarRepetidos(result) {
        var rpt = false;
        for (let i = 0; i < this.relacionPropietario.length; i++) {
            if (this.relacionPropietario[i].idpersona.id == result.id) {
                rpt = true;
                return rpt;
            }
        }
        return rpt;
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

    handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');
        this.cargando = false;
    };
}
