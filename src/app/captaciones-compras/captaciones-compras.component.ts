import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalCompraformularioComponent } from './modal-compraformulario/modal-compraformulario.component';
import {ApiRequestService} from "../servicios/api-request.service";
import {Savecompradto} from "../entidades/entidad.savecompradto";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-captaciones-compras',
  templateUrl: './captaciones-compras.component.html',
  styleUrls: ['./captaciones-compras.component.css']
})
export class CaptacionesComprasComponent implements OnInit {

  public cargando:boolean =false;
  public listacompra:Savecompradto[]=[];
  constructor(
    private modalService: NgbModal,
    private api: ApiRequestService,
    private modal:NgbModal,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.listarcompras();
  }

  abrirNuevaCompra(): void {
    const modalRef = this.modalService.open(ModalCompraformularioComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  };

  listarcompras(){
    this.cargando = true;
    this.api.get("compra/listar")
        .then(respuesta => {
          if(respuesta && respuesta.extraInfo){
            this.listacompra = respuesta.extraInfo;
            this.cargando =false;
          } else {
            this.toastr.error(respuesta.operacionMensaje, 'Error');
            this.cargando = false;
          }
        })
        .catch(err => this.handleError(err));
    this.cargando = false;
  };

  handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
    this.cargando =false;
  }

}
