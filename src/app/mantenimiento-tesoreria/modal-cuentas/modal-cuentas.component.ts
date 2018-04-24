import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../servicios/auth.service';
import { ApiRequestService } from '../../servicios/api-request.service';
import { Cuentabanco } from '../../entidades/entidad.cuentabanco';
import { ConfirmacionComponent } from '../../util/confirmacion/confirmacion.component';
import { Plandecuentas } from '../../entidades/entidad.plandecuentas';
import { Paginacion } from '../../entidades/entidad.paginacion';



@Component({
  selector: 'app-modal-cuentas',
  templateUrl: './modal-cuentas.component.html',
  styleUrls: ['./modal-cuentas.component.css']
})
export class ModalCuentasComponent implements OnInit {

  public holderNombre:string;

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

  constructor(
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    public api: ApiRequestService,
    public apiRequest: ApiRequestService,
    public toastr: ToastrService,
    public auth: AuthService,
  ) {
    this.holderNombre="Ingrese Nombre";

    this.planCuentas = new Plandecuentas();
    this.paginacion = new Paginacion();
   }

  ngOnInit() {
    //init arrrayPlanCuentas
    this.listarCuentas();

  }
  //metodo para guardar plan de cuentas
  guardarPlanPaCuenta() {
    this.cargando = true;
    this.api.post("plancuenta", this.planCuentas).then(respuesta => {
        if (respuesta && respuesta.extraInfo) {
          this.planCuentas = respuesta.extraInfo;
          this.toastr.success("Registro guardado exitosamente", 'Exito');
          this.cargando = false;
        } else {
          this.cargando = false;
          this.toastr.error(respuesta.operacionMensaje, 'Error');
        }
      })
      .catch(err => this.handleError(err));

  };
  private handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
    this.cargando = false;
  };

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

  listarCuentas() {
    this.cargando = true;
    this.api.post('plancuenta/pagina/' + this.page + '/cantidadPorPagina/' + this.paginacion.cantidadPorPagina, this.parametros)
      .then(data => {
        if (data) {
          this.paginacion.totalRegistros = data.totalRegistros;
          this.paginacion.paginaActual = data.paginaActual;
          this.paginacion.totalPaginas = data.totalPaginas;
          this.planCuentas = data.registros;
          this.cargando = false;
        }
      })
      .catch(err => this.handleError(err));
  };
}
