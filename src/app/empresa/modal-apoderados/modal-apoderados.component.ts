import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-apoderados',
  templateUrl: './modal-apoderados.component.html',
  styleUrls: ['./modal-apoderados.component.css']
})
export class ModalApoderadosComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

}
