import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalCompraformularioComponent } from './modal-compraformulario/modal-compraformulario.component';

@Component({
  selector: 'app-captaciones-compras',
  templateUrl: './captaciones-compras.component.html',
  styleUrls: ['./captaciones-compras.component.css']
})
export class CaptacionesComprasComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  abrirNuevaCompra(): void {
    const modalRef = this.modalService.open(ModalCompraformularioComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

}
