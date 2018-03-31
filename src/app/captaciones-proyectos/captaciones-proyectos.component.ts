import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalProyectosformularioComponent } from './modal-proyectosformulario/modal-proyectosformulario.component';
import { ApiRequestService } from '../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { Paginacion } from '../entidades/entidad.paginacion';

@Component({
  selector: 'app-captaciones-proyectos',
  templateUrl: './captaciones-proyectos.component.html',
  styleUrls: ['./captaciones-proyectos.component.css']
})
export class CaptacionesProyectosComponent implements OnInit {

  public cargando: boolean = false;
  public page: number = 1;
  public paginacion: Paginacion;
  public  lista:any=[];

  constructor(
    private modalService: NgbModal,
    private api: ApiRequestService,
    private modal: NgbModal,
    private toastr: ToastrService
  ) {
    this.paginacion = new Paginacion();
  }

  ngOnInit() {
  }

  abrirProyecto(): void {
    const modalRef = this.modalService.open(ModalProyectosformularioComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  listarProyectos() {
    this.cargando = true;
        this.api.get("proyectos/listar")
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo) {
                    this.lista = respuesta.extraInfo;
                    this.cargando = false;
                } else {
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                  this.cargando = false;
                }
            })
            .catch(err => this.handleError(err));
  }
}
