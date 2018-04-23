import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalProyectosformularioComponent } from './modal-proyectosformulario/modal-proyectosformulario.component';
import { ApiRequestService } from '../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { Paginacion } from '../entidades/entidad.paginacion';
import { Proyecto } from '../entidades/entidad.proyecto';
import { ConfirmacionComponent } from '../util/confirmacion/confirmacion.component';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-captaciones-proyectos',
  templateUrl: './captaciones-proyectos.component.html',
  styleUrls: ['./captaciones-proyectos.component.css']
})
export class CaptacionesProyectosComponent implements OnInit {
  public confirmarcambioestado: boolean = false;
  public cargando: boolean = false;
  public page: number = 1;
  public paginacion: Paginacion;
  public  lista: any = []; // lista proyecto

  constructor(
    private modalService: NgbModal,
    private api: ApiRequestService,
    private modal: NgbModal,
    public auth: AuthService,
    private toastr: ToastrService
  ) {
    this.paginacion = new Paginacion();
  }

  ngOnInit() {
    this.listarProyectos();
  }

  abrirProyecto(): void {
    const modalRef = this.modalService.open(ModalProyectosformularioComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
      this.listarProyectos();
    }, (reason) => {
    });
  }

  confirmarcambiodeestado(proyecto): void {
        const modalRef = this.modal.open(ConfirmacionComponent, {windowClass: 'nuevo-modal', size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.confirmarcambioestado = true;
            this.cambiarestadoproyecto(proyecto);
            // this.auth.agregarmodalopenclass();
        }, (reason) => {
            proyecto.estado = !proyecto.estado;
            // this.auth.agregarmodalopenclass();
        });
    }

  cambiarestadoproyecto(proyecto: Proyecto) {
    this.cargando = true;
    return this.api.post('proyecto/eliminarconestado', {id: proyecto.id})
        .then(
            data => {
                if(data && data.extraInfo) {
                    this.toastr.success(data.operacionMensaje, 'Exito');
                    this.listarProyectos();
                } else {
                    this.toastr.info(data.operacionMensaje, 'Informacion');
                }
                this.cargando = false;
            }
        )
        .catch(err => this.handleError(err));
  }

  listarProyectos() {
    this.cargando = true;
        this.api.get('proyecto/listar')
            .then(respuesta => {
                if (respuesta && respuesta.extraInfo) {
                    this.lista = respuesta.extraInfo;
                    this.cargando = false;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                  this.cargando = false;
                }
            })
            .catch(err => this.handleError(err));
  }

  traerParaEdicion(id) {
        const modalRef = this.modal.open(ModalProyectosformularioComponent, {size: 'lg', keyboard: false});
        modalRef.componentInstance.edit = id;
        modalRef.result.then((result) => {
            this.listarProyectos();
        }, (reason) => {
        });
  }

  private handleError(error: any): void {
    this.cargando = false;
      this.toastr.error('Error Interno', 'Error');
  }
}
