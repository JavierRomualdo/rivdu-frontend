import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalVentaformularioComponent } from './modal-ventaformulario/modal-ventaformulario.component';
import { AuthService } from '../servicios/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from '../servicios/api-request.service';

@Component({
  selector: 'app-captaciones-ventas',
  templateUrl: './captaciones-ventas.component.html',
  styleUrls: ['./captaciones-ventas.component.css']
})
export class CaptacionesVentasComponent implements OnInit {


  constructor(
    public auth: AuthService,
    public api: ApiRequestService,
    public toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

  }

  abrirNuevaVenta(): void {
    const modalRef = this.modalService.open(ModalVentaformularioComponent, {size: 'lg', keyboard: false});
    modalRef.result.then((result) => {

    }, (reason) => {
    });
  }


}
