import { Component, OnInit, Input } from '@angular/core';
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
  //declare variables
  @Input() idplan;
  public cargando: boolean = false;
  public planCuentas: Plandecuentas;
  public planCuentasArray: Plandecuentas[];
  public vistaFormulario: boolean = false;
  //variables para buusqueda
  public page: number = 1;
  public codigo: string = "";
  public paginacion: Paginacion;
  public parametros: any = {};
  //variables para modal
  public confirmarcambioestado: boolean = false;

  constructor(
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
    if (this.idplan) {
      this.traerParaEdicion();
    }
  }
  //metodo para guardar plan de cuentas
  guardarPlanCuenta() {
    this.cargando = true;
    this.api.post("plancuenta", this.planCuentas).then(respuesta => {
      if (respuesta && respuesta.extraInfo) {
        this.planCuentas = respuesta.extraInfo;
        this.toastr.success("Registro guardado exitosamente", 'Exito');
        this.cargando = false;
        this.activeModal.dismiss('Cross click');
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
    this.planCuentas = new Plandecuentas();
    this.cargando = false;
  };
  
  traerParaEdicion() {
    this.cargando = true;
    this.vistaFormulario = true;
    return this.api.post('plancuenta/obtener', { id: this.idplan })
      .then(
        data => {
          if (data && data.extraInfo) {
            this.cargando = false;
            this.planCuentas = data.extraInfo;

          } else {
            this.toastr.info(data.operacionMensaje, "Informacion");

          }
        }
      )
      .catch(err => this.handleError(err));
  }

}

