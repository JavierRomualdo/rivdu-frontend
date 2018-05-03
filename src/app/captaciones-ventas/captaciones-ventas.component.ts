import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalVentaformularioComponent } from './modal-ventaformulario/modal-ventaformulario.component';
import { AuthService } from '../servicios/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from '../servicios/api-request.service';
import { Paginacion } from "../entidades/entidad.paginacion";

@Component({
  selector: 'app-captaciones-ventas',
  templateUrl: './captaciones-ventas.component.html',
  styleUrls: ['./captaciones-ventas.component.css']
})
export class CaptacionesVentasComponent implements OnInit {

  public dni: string = "";
  public nombre: string = "";
  public fechainicio: string = "";
  public fechafin: string = "";
  public cargando: boolean = false;
  public page: number = 1;
  public paginacion: Paginacion;
  public confirmarcambioestado: boolean = false;
  public parametros: any = {};
  public correlativo:string="";

  constructor(
    public auth: AuthService,
    public api: ApiRequestService,
    public toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

  }

  abrirNuevaVenta(): void {
    const modalRef = this.modalService.open(ModalVentaformularioComponent, { size: 'lg', keyboard: false });
    modalRef.result.then((result) => {

    }, (reason) => {
    });
  }

  busqueda(): void {
    this.page = 1;
    this.parametros = {
      "dni": this.dni,
      "nombre": this.nombre,
      "fechainicio": this.fechainicio,
      "fechafin": this.fechafin,
      "correlativo": this.correlativo
    };
    // this.listarcompras();
  };


}
