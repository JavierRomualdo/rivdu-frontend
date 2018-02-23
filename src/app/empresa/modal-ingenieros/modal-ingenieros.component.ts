import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-ingenieros',
  templateUrl: './modal-ingenieros.component.html',
  styleUrls: ['./modal-ingenieros.component.css']
})
export class ModalIngenierosComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

}
