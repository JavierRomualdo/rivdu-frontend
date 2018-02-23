import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-sucursales',
  templateUrl: './modal-sucursales.component.html',
  styleUrls: ['./modal-sucursales.component.css']
})
export class ModalSucursalesComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

}
