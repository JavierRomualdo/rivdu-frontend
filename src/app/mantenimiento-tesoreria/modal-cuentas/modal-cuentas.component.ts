import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../servicios/auth.service';
import { ApiRequestService } from '../../servicios/api-request.service';
import { Cuentabanco } from '../../entidades/entidad.cuentabanco';
import { ConfirmacionComponent } from '../../util/confirmacion/confirmacion.component';
import { Plandecuentas } from '../../entidades/entidad.plandecuentas';


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

  constructor(
    private activeModal: NgbActiveModal,
    private modal: NgbModal,
    public api: ApiRequestService,
    public apiRequest: ApiRequestService,
    public toastr: ToastrService,
    public auth: AuthService
  ) {
     this.holderNombre="Ingrese Nombre";
   }

  ngOnInit() {
    
    //init arrrayPlanCuentas
    this.planCuentas = new Plandecuentas();
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
}
