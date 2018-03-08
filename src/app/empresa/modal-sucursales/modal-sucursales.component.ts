import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { Paginacion } from '../../entidades/entidad.paginacion';
import { ToastrService } from 'ngx-toastr';
import { Sucursal } from '../../entidades/entidad.sucursal';

@Component({
  selector: 'app-modal-sucursales',
  templateUrl: './modal-sucursales.component.html',
  styleUrls: ['./modal-sucursales.component.css']
})
export class ModalSucursalesComponent implements OnInit {

  //declarando variables
  public page:number = 1;
  public paginacion:Paginacion;
  public cargando:boolean= false;
  public vistaFormulario = false;
  public ruc:string="";
  public nombre:string = "";
  public sucursales:Sucursal[];
  public sucursal:Sucursal;
  public parametros:any = {};
  constructor(
    public activeModal: NgbActiveModal,
    public api: ApiRequestService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.listarSucursales();
  }

  listarSucursales(){
    this.cargando= true;
    this.api.post('sucursal/pagina/'+this.page+'/cantidadPorPagina/'+this.paginacion.cantidadPorPagina, this.parametros)
        .then(data => {
          if(data){
            this.cargando = false;
            this.paginacion.totalRegistros = data.totalRegistros;
            this.paginacion.paginaActual = data.paginaActual;
            this.paginacion.totalPaginas = data.totalPaginas;
            this.sucursales = data.registros;
          }
        })
        .catch(err => this.handleError(err));
  };


  private handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
  }
}
