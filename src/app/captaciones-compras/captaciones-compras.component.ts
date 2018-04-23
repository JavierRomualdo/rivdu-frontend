import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalCompraformularioComponent } from './modal-compraformulario/modal-compraformulario.component';
import {ApiRequestService} from "../servicios/api-request.service";
import {AuthService} from "../servicios/auth.service";
import {Savecompradto} from "../entidades/entidad.savecompradto";
import { ConfirmacionComponent } from '../util/confirmacion/confirmacion.component';
import {ToastrService} from 'ngx-toastr';
import {Paginacion} from "../entidades/entidad.paginacion";
import {Personacompra} from "../entidades/entidad.personacompra";

@Component({
  selector: 'app-captaciones-compras',
  templateUrl: './captaciones-compras.component.html',
  styleUrls: ['./captaciones-compras.component.css']
})
export class CaptacionesComprasComponent implements OnInit {

  public cargando:boolean =false;
  public page: number = 1;
  public paginacion: Paginacion;
  public confirmarcambioestado:boolean=false;
  public parametros:any={};
  public listacompra:Savecompradto[]=[];
  public personacompra:Personacompra[]=[];
  public dni:string="";
  public nombre:string="";
  public correlativo:string="";

  constructor(
    private modalService: NgbModal,
    private api: ApiRequestService,
    private apiRequest: ApiRequestService,
    private auth: AuthService,
    private modal:NgbModal,
    private toastr: ToastrService
  ) {
    this.paginacion = new Paginacion();
  }

  ngOnInit() {
    this.busqueda();
  }

  confirmarcambiodeestado(personacompra):void{
    const modalRef = this.modal.open(ConfirmacionComponent, {windowClass:'nuevo-modal', size: 'sm', keyboard: false});
    modalRef.result.then((result) => {
      this.confirmarcambioestado=true;
      this.cambiarestadoCompra(personacompra);
    }, (reason) => {
      personacompra.estado = !personacompra.estado;
    });
  };

  cambiarestadoCompra(personacompra){
    this.cargando = true;
    return this.apiRequest.post('compra/eliminar', {id:personacompra.id})
        .then(
            data => {
              if(data && data.extraInfo){
                this.toastr.success(data.operacionMensaje," Exito");
                this.listarcompras();
              } else {
                this.toastr.info(data.operacionMensaje,"Informacion");
              }
              this.cargando = false;
            }
        )
        .catch(err => this.handleError(err));
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
    }, (reason) => {
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

  traerParaEdicion(id){
    const modalRef = this.modal.open(ModalCompraformularioComponent, {size: 'lg', keyboard: false});
    modalRef.componentInstance.edit = id;
    modalRef.result.then((result) => {
      this.listarcompras();
    }, (reason) => {
    });
  }

  handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
    this.cargando =false;
  }

}
