import { Component, Input, OnInit } from '@angular/core';
import { Paginacion } from '../../entidades/entidad.paginacion';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { Persona } from '../../entidades/entidad.persona';


@Component({
  selector: 'app-modal-ingenieros',
  templateUrl: './modal-ingenieros.component.html',
  styleUrls: ['./modal-ingenieros.component.css']
})
export class ModalIngenierosComponent implements OnInit {

    @Input() isModalIngeniero;
    public page: number = 1;
    public paginacion: Paginacion;
    public solicitando = false;
    public vistaFormulario = false;
    public dni:string="";
    public nombre:string="";
    public ingenieros:Persona[];
    public ingeniero:Persona;
    public parametros:any={};

      constructor(
        public activeModal: NgbActiveModal,
        public api: ApiRequestService,
        private apiRequest: ApiRequestService,
        public toastr: ToastrService
      ) {
        this.ingenieros= [];
        this.paginacion = new Paginacion();
          this.ingeniero= new Persona();
      }

    ngOnInit() {
         this.listarIngenieros();
    }

    busqueda(): void {
        this.page = 1;
        this.parametros = {
            "dni":this.dni,
            "nombre":this.nombre
        };
        this.listarIngenieros();
    }
    nuevo(){
        this.vistaFormulario=true;
        this.ingeniero= new Persona();

    }

    guardarIngenieros(){
        if(this.ingeniero.id){
            return this.apiRequest.put('ingeniero/guardar', this.ingeniero)
                .then(
                    data => {
                        if(data && data.extraInfo){
                            this.solicitando = false;
                          //  this.solicitudExitosa = true;
                            this.vistaFormulario = false;
                            this.ingeniero = data.extraInfo;
                            let producto = this.ingenieros.find(item => item.id === this.ingeniero.id);
                            let index = this.ingenieros.indexOf(producto);
                            this.ingenieros[index] = this.ingeniero;
                            this.ingeniero =new Persona();
                        }
                        else{
                            this.toastr.info(data.operacionMensaje,"Informacion");
                            this.solicitando = false;
                        }
                    }
                )
                .catch(err => this.handleError(err));
        } else {
            return this.apiRequest.post('ingeniero/guardar', this.ingeniero)
                .then(
                    data => {
                        if(data && data.extraInfo){
                            this.solicitando = false;
                            //this.solicitudExitosa = true;
                            this.ingenieros.push(data.extraInfo);
                            this.vistaFormulario = false;
                            this.ingeniero = new Persona();
                        }
                        else{
                            this.toastr.info(data.operacionMensaje,"Informacion");
                            this.solicitando = false;
                        }
                    }
                )
                .catch(err => this.handleError(err));
        }

    }
  listarIngenieros(){
    this.api.post('ingeniero/pagina/'+this.page+'/cantidadPorPagina/'+this.paginacion.cantidadPorPagina, this.parametros)
        .then(data => {
            if(data){
                this.solicitando = false;
                this.paginacion.totalRegistros = data.totalRegistros;
                this.paginacion.paginaActual = data.paginaActual;
                this.paginacion.totalPaginas = data.totalPaginas;
                this.ingenieros = data.registros;
            }
        })
        .catch(err => this.handleError(err));
  }
  private handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
  }

}
