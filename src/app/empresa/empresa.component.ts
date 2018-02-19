import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalEmpresaComponent } from './modal-empresa/modal-empresa.component'

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

  }

  abrirDatos():void{
    const modalRef = this.modalService.open(ModalEmpresaComponent, {size: 'lg', keyboard: false});
    modalRef.componentInstance.isModal = true;
    modalRef.result.then((result) => {
      //this.ngOnInit();
    }, (reason) => {
      //this.pedido.idcliente = reason ? reason : this.pedido.idcliente;
    });
  }

}
