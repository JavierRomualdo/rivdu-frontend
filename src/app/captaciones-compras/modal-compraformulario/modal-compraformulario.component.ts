import { Ubigeo } from './../../entidades/entidad.ubigeo';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../servicios/auth.service';
import { ApiRequestService } from '../../servicios/api-request.service';
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
    public propietarioList: Personacompra[] = [];
    public allegadosList: Personacompra[] = [];
    public rel: Relacion;
    public cargando: boolean = false;
    public vistaFormulario: boolean = false;
    public ubigeo: Ubigeo;
    public predio: Predio;
    public compra: Compra;
    public todocompra: Savecompradto;
    public captador: Captador;
    public colindante: Colindante;
    public servicios: Servicio[] = [];
    public persona: Persona;
    public idpersona: Persona;
    selectedServicios: string[] = [];

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
        this.colindante = new Colindante();
        this.todocompra = new Savecompradto();
    }

    ngOnInit() {
        if (this.edit) {
            this.traerParaEdicion(this.edit);
        }
        this.listarRelacionParentesco();
        this.listarServicios();
    };

    traerParaEdicion(id) {
        this.cargando = true;
        this.selectedServicios = [];
        this.vistaFormulario = true;
        return this.apiRequest.post('compra/obtener', { id: id })
            .then(
                data => {
                    if (data && data.extraInfo) {
                        this.todocompra = data.extraInfo;
                        this.persona = this.todocompra.propietarioList[0].idpersona;
                        this.propietarioList.push(this.todocompra.propietarioList[0]);
                        this.allegadosList = this.todocompra.allegadosList;
                        this.rel = this.todocompra.allegadosList[0].idrelacion;
                        this.llenarCombo(this.allegadosList);
                        this.predio = this.todocompra.predio ? this.todocompra.predio : new Predio();
                        this.compra = this.todocompra.compra ? this.todocompra.compra : new Compra();
                        this.captador = this.todocompra.captador ? this.todocompra.captador : new Captador();
                        this.colindante = this.todocompra.colindante ? this.todocompra.colindante : new Colindante();
                        if (this.todocompra.servicios) {
                            for (let i = 0; i < this.todocompra.servicios.length; i++) {
                                this.selectedServicios.push(this.todocompra.servicios[i] + "");
                            }
                        }
                        this.cargando = false;
                    } else {
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
        this.todocompra.allegadosList = this.allegadosList;
        this.todocompra.propietarioList = this.propietarioList;
        this.todocompra.predio = this.predio;
        this.todocompra.captador = this.captador;
        this.todocompra.colindante = this.colindante;
        this.todocompra.compra = this.compra;
        this.todocompra.servicios = this.selectedServicios;
        this.cargando = true;
        if (this.predio.id) {
            this.todocompra.compra.usuarioeditaa = this.auth.getUserName();
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
            this.todocompra.compra.usuariocrea = this.auth.getUserName();
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

    confirmarEliminacion(o): void {
        const modalRef = this.modal.open(ConfirmacionComponent, { windowClass: 'nuevo-modal', size: 'sm', keyboard: false });
        modalRef.result.then((result) => {
            this.quitarAllegado(o);
            this.auth.agregarmodalopenclass();
        }, (reason) => {
            this.auth.agregarmodalopenclass();
        });
    };

    quitarAllegado(o) {
        this.api.get("compra/quitarallegado/" + o.id)
            .then(respuesta => {
                if (respuesta && respuesta.extraInfo) {
                    this.toastr.success(respuesta.operacionMensaje, 'Exito');
                    this.allegadosList.splice(this.allegadosList.indexOf(o), 1);
                    this.cargando = false;
                } else {
                    this.cargando = false;
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));
    };

    abrirModalPropietario(): void {
        const modalRef = this.modal.open(ModalIngenierosComponent, { windowClass: 'nuevo-modal', size: 'lg', keyboard: false });
        modalRef.result.then((result) => {
            let puedeSerSeleccionado = true;
            let propietario = new Personacompra();
            propietario.id = null;
            propietario.idcompra = this.compra.id;
            propietario.estado = true;
            for (let i = 0; i < this.allegadosList.length; i++) {
                if (this.allegadosList[i].idpersona.id == result.id) {
                    this.toastr.warning("Persona ya se encuentra seleccionada.", "Aviso");
                    puedeSerSeleccionado = false;
                    break;
                }
            }
            if (puedeSerSeleccionado) {
                this.propietarioList = [];
                propietario.idpersona = result;
                this.propietarioList.push(propietario);
                this.persona = result;
            }
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
                let relacionPropietario = new Personacompra();
                relacionPropietario.id = null;
                relacionPropietario.estado = true;
                relacionPropietario.idcompra = this.compra.id;
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
