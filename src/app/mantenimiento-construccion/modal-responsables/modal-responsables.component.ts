import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ApiRequestService} from '../../servicios/api-request.service';
import {ToastrService} from 'ngx-toastr';
import {Responsable} from '../../entidades/entidad.responsable';
import {ModalEstadocivilComponent} from "../../mantenimiento-captacion/modal-estadocivil/modal-estadocivil.component";

@Component({
  selector: 'app-modal-responsables',
  templateUrl: './modal-responsables.component.html',
  styleUrls: ['./modal-responsables.component.css']
})
export class ModalResponsablesComponent implements OnInit {

    public cargando:boolean=false;
    public listado:boolean=false;
    public  lista:any=[];

    public responsable:Responsable;

  constructor(public activeModal: NgbActiveModal,
              public api: ApiRequestService,
              public toastr: ToastrService,
              public modal: NgbModal,
              private modalService: NgbModal) {
    this.responsable = new Responsable();
  }

  ngOnInit() {
  }

  private handleError(error: any): void {
        this.toastr.error("Error Interno", 'Error');
        this.cargando = false;
  }

}
