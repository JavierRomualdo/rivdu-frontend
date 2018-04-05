import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-captaciones-expedientes',
  templateUrl: './captaciones-expedientes.component.html',
  styleUrls: ['./captaciones-expedientes.component.css']
})
export class CaptacionesExpedientesComponent implements OnInit {

  opcion=true;
  programas: any[];
  cols:any[];

  constructor() { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'codigo', header: 'Codigo' }
    ];
    this.programas = [
      { name: 'Sitio Propio', codigo: 'SP-0999393' }
    ];
  }

  opciones(){
    this.opcion = true;
  }

}
