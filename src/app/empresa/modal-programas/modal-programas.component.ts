import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { LS } from '../../app-constants';
import { Programas } from '../../entidades/entidad.programas';

@Component({
  selector: 'app-modal-programas',
  templateUrl: './modal-programas.component.html',
  styleUrls: ['./modal-programas.component.css']
})
export class ModalProgramasComponent implements OnInit {

  public programa:Programas;

  constructor(
    public activeModal: NgbActiveModal,
    public api: ApiRequestService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.programa = new Programas();
  }

}
