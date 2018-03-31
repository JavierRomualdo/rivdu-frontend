import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../servicios/auth.service';
import {ApiRequestService} from '../../servicios/api-request.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-modal-proyectosformulario',
  templateUrl: './modal-proyectosformulario.component.html',
  styleUrls: ['./modal-proyectosformulario.component.css']
})
export class ModalProyectosformularioComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    public authService: AuthService,
    public api: ApiRequestService,
    public auth: AuthService,
    private modalService: NgbModal,
    private modal: NgbModal,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
  }
  guardarproyecto() {

  }
}
