import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalCompraformularioComponent } from './modal-compraformulario/modal-compraformulario.component';
import {ApiRequestService} from "../servicios/api-request.service";
import {AuthService} from "../servicios/auth.service";
import {Savecompradto} from "../entidades/entidad.savecompradto";
import {ToastrService} from 'ngx-toastr';
import {Paginacion} from "../entidades/entidad.paginacion";

@Component({
  selector: 'app-captaciones-compras',
  templateUrl: './captaciones-compras.component.html',
  styleUrls: ['./captaciones-compras.component.css']
})
export class CaptacionesComprasComponent implements OnInit {

  public cargando:boolean =false;
  public page: number = 1;
  public paginacion: Paginacion;
  public parametros:any={};
  public listacompra:Savecompradto[]=[];
  public dni:string="";
  public nombre:string="";
  public correlativo:string="";

  constructor(
    private modalService: NgbModal,
    private api: ApiRequestService,
    private auth: AuthService,
    private modal:NgbModal,
    private toastr: ToastrService
  ) {
    this.paginacion = new Paginacion();
  }

  ngOnInit() {
    this.busqueda();
  }

  busqueda(): void {
    this.page = 1;
    this.parametros = {
      "dni":this.dni,
      "nombre":this.nombre,
      "correlativo":this.correlativo
    };
    this.listarcompras();
  };

  abrirNuevaCompra(): void {
    const modalRef = this.modalService.open(ModalCompraformularioComponent, {windowClass:'modal-open', size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
      this.listarcompras();
      this.auth.agregarmodalopenclass();
    }, (reason) => {
      this.auth.agregarmodalopenclass();
    });
  };

  listarcompras(){
    this.cargando= true;
    this.api.post('compra/pagina/'+this.page+'/cantidadPorPagina/'+this.paginacion.cantidadPorPagina, this.parametros)
        .then(data => {
          if(data){
            this.cargando = false;
            this.paginacion.totalRegistros = data.totalRegistros;
            this.paginacion.paginaActual = data.paginaActual;
            this.paginacion.totalPaginas = data.totalPaginas;
            this.listacompra = data.registros;
          }
        })
        .catch(err => this.handleError(err));
  };

  handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
    this.cargando =false;
  }

}
