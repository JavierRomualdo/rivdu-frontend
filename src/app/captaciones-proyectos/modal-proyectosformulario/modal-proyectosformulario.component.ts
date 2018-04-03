import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../servicios/auth.service';
import {ApiRequestService} from '../../servicios/api-request.service';
import {ToastrService} from 'ngx-toastr';
import { Proyecto } from '../../entidades/entidad.proyecto';

@Component({
  selector: 'app-modal-proyectosformulario',
  templateUrl: './modal-proyectosformulario.component.html',
  styleUrls: ['./modal-proyectosformulario.component.css']
})
export class ModalProyectosformularioComponent implements OnInit {
  @Input() edit;
  public proyecto: Proyecto;
  public  lista: any = [];
  public confirmarcambioproyecto = false;
  public cargando: boolean = false;
  public listado: boolean = false;
  public vistaFormulario = false;
  public verNuevo = false;
  constructor(
    public activeModal: NgbActiveModal,
    public authService: AuthService,
    private apiRequest: ApiRequestService,
    public api: ApiRequestService,
    public auth: AuthService,
    private modalService: NgbModal,
    private modal: NgbModal,
    public toastr: ToastrService
  ) {
    this.proyecto = new Proyecto();
   }

  ngOnInit() {
    if (this.edit) {
      this.traerParaEdicion(this.edit);
    }
  }
  guardarproyecto() {
    this.cargando = true;
    if (!this.proyecto.id) { // nuevo
        this.api.post('proyecto', this.proyecto)
          .then(respuesta => {
            if (respuesta && respuesta.extraInfo) {
              this.proyecto = respuesta.extraInfo;
              this.toastr.success(respuesta.operacionMensaje, 'Exito');
              this.activeModal.close(this.proyecto);
              this.cargando = false;
            } else {
              this.cargando = false;
              this.toastr.error(respuesta.operacionMensaje, 'Error');
            }
          })
          .catch(err => this.handleError(err));
    } else { // editar
      return this.api.post('proyecto', this.proyecto)
        .then(
          data => {
            if (data && data.extraInfo) {
                this.cargando = false;
                this.proyecto = data.extraInfo;
                this.proyecto = new Proyecto();
                this.toastr.success(data.operacionMensaje, 'Exito');
                this.activeModal.close(this.proyecto);
                this.cargando = false;
              } else {
                this.toastr.info(data.operacionMensaje, 'Informacion');
                this.cargando = false;
              }
          }
        )
        .catch(err => this.handleError(err));
    }
  }

  eliminarproyecto(li) {
    this.cargando = true;
    this.api.delete('proyecto/eliminarproyecto/' + li.id)
        .then(respuesta => {
            if (respuesta && respuesta.extraInfo) {
                this.lista.splice(this.lista.lastIndexOf(li), 1);
            } else {
                this.toastr.error(respuesta.operacionMensaje, 'Error');
            }
          this.cargando = false;
        })
        .catch(err => this.handleError(err));
  }

  traerParaEdicion(id) {
    this.cargando = true;
    this.vistaFormulario = true;
    this.verNuevo = true;
    return this.apiRequest.post('proyecto/obtener', {id: id})
      .then(
        data => {
          if (data && data.extraInfo){
            this.cargando = false;
            this.proyecto = data.extraInfo;
          } else {
            this.toastr.info(data.operacionMensaje, 'Informacion');
            this.vistaFormulario = false;
            this.cargando = false;
          }
        }
      )
      .catch(err => this.handleError(err));
  }

  private handleError(error: any): void {
    this.cargando = false;
      this.toastr.error('Error Interno', 'Error');
  }
}
