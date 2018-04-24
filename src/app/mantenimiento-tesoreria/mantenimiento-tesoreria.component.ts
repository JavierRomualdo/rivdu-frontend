import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalBancosComponent } from './modal-bancos/modal-bancos.component'
import { ModalCostosComponent } from "./modal-costos/modal-costos.component";
import { ModalCuentasComponent } from "./modal-cuentas/modal-cuentas.component";
import { ApiRequestService } from '../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../servicios/auth.service';
import { Paginacion } from '../entidades/entidad.paginacion';
import { Plandecuentas } from '../entidades/entidad.plandecuentas';
import { ConfirmacionComponent } from '../util/confirmacion/confirmacion.component';

@Component({
  selector: 'app-mantenimiento-tesoreria',
  templateUrl: './mantenimiento-tesoreria.component.html',
  styleUrls: ['./mantenimiento-tesoreria.component.css']
})
export class MantenimientoTesoreriaComponent implements OnInit {

  //declare variables
  public cargando: boolean = false;
  public lista: any = [];
  public listado: boolean = false;
  public verNuevo: boolean = false;
  public planCuentas: Plandecuentas;
  public planCuentasArray: Plandecuentas[];
  //variables para buusqueda
  public page: number = 1;
  public codigo: string = "";
  public paginacion: Paginacion;
  public confirmarcambioestado: boolean = false;
  public solicitando = false;
  public parametros: any = {};
  //variables modal
  public vistaFormulario: boolean = false;
  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    public api: ApiRequestService,
    public apiRequest: ApiRequestService,
    public toastr: ToastrService,
    public auth: AuthService,
  ) { 
    this.planCuentas = new Plandecuentas();
    this.paginacion = new Paginacion();
  }

  ngOnInit() {
    this.listarCuentas();
  }

  abrirPlan():void{
    const modalRef = this.modalService.open(ModalCuentasComponent, {size: 'sm', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }
  abrirPlanEdit(id): void {
    const modalRef = this.modalService.open(ModalCuentasComponent, { size: 'sm', keyboard: false });
    modalRef.componentInstance.idplan = id;
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }
  abrirCostos():void{
    const modalRef = this.modalService.open(ModalCostosComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  abrirBancos():void{
    const modalRef = this.modalService.open(ModalBancosComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }
  //nuevo init
  nuevo() {
    this.cargando = true;
    this.verNuevo = false;
    this.planCuentas = new Plandecuentas();
    this.cargando = false;
  };

  //metodo busqueda by codigo
  busqueda(): void {
    this.page = 1;
    this.parametros = {
      "codigo": this.codigo
    };
    this.listarCuentas();
  };

  private handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
    this.cargando = false;
  };

  listarCuentas() {
    this.cargando = true;
    this.api.post('plancuenta/pagina/' + this.page + '/cantidadPorPagina/' + this.paginacion.cantidadPorPagina, this.parametros)
      .then(data => {
        if (data) {
          this.paginacion.totalRegistros = data.totalRegistros;
          this.paginacion.paginaActual = data.paginaActual;
          this.paginacion.totalPaginas = data.totalPaginas;
          this.planCuentasArray = data.registros;
          this.cargando = false;
        }
      })
      .catch(err => this.handleError(err));
  };
  //confirmacion de cambion de estado plan de cuentas
  confirmarcambiodeestado(planCuentas) {
    const modalRef = this.modal.open(ConfirmacionComponent, { windowClass: 'nuevo-modal', size: 'sm', keyboard: false });
    modalRef.result.then((result) => {
      this.confirmarcambioestado = true;
      // this.confirmarcambiodeestado(this.planCuentas);
      this.auth.agregarmodalopenclass();
    }, (reason) => {
      planCuentas.estado = !planCuentas.estado;
      this.auth.agregarmodalopenclass();
    });
  };
  //metodo obtener datos para edicion
  getPlanCuentaEdit(id) {
    this.abrirPlanEdit(id);
  };  
}

