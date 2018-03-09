import { Component, Input, OnInit } from '@angular/core';
import { Paginacion } from '../../entidades/entidad.paginacion';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiRequestService } from '../../servicios/api-request.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmacionComponent } from '../../util/confirmacion/confirmacion.component';
import { ModalUbigeoComponent } from '../../mantenimiento-captacion/modal-ubigeo/modal-ubigeo.component';
import { Persona } from '../../entidades/entidad.persona';
import { Ubigeo } from '../../entidades/entidad.ubigeo';


@Component({
  selector: 'app-modal-ingenieros',
  templateUrl: './modal-ingenieros.component.html',
  styleUrls: ['./modal-ingenieros.component.css']
})
export class ModalIngenierosComponent implements OnInit {

    @Input() isModalIngeniero;
    public page: number = 1;
    public paginacion: Paginacion;
    public cargando:boolean= false;
    public vistaFormulario = false;
    public dni:string="";
    public nombre:string="";
    public ingenieros:Persona[];
    public ingeniero:Persona;
    public ubigeos:any = [];
    public parametros:any={};

      constructor(
        public activeModal: NgbActiveModal,
        public api: ApiRequestService,
        private modalService: NgbModal,
        private apiRequest: ApiRequestService,
        public toastr: ToastrService
      ) {
        this.ingenieros= [];
        this.paginacion = new Paginacion();
        this.ingeniero= new Persona();
        this.ingeniero.idubigeo = new Ubigeo();
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
    };

    limpiar():void{
        this.nombre ="";
        this.dni = "";
        this.parametros ={};
        this.listarIngenieros();
    };

    nuevo(){
        this.vistaFormulario=true;
        this.ingeniero= new Persona();
        this.ingeniero.idubigeo = new Ubigeo();
    };

    guardarIngenieros(){
        this.cargando= true;
        if(this.ingeniero && this.ingeniero.idubigeo && !this.ingeniero.idubigeo.id){
            this.ingeniero.idubigeo= null;
        }
        if(this.ingeniero.id){
            return this.apiRequest.put('ingeniero', this.ingeniero)
                .then(
                    data => {
                        if(data && data.extraInfo){
                            this.cargando = false;
                            this.vistaFormulario = false;
                            this.ingeniero = data.extraInfo;
                            let producto = this.ingenieros.find(item => item.id === this.ingeniero.id);
                            let index = this.ingenieros.indexOf(producto);
                            this.ingenieros[index] = this.ingeniero;
                            this.ingeniero = new Persona();
                        }else{
                            this.toastr.info(data.operacionMensaje,"Informacion");
                            this.cargando = false;
                        }
                        if(this.ingeniero && !this.ingeniero.idubigeo){
                            this.ingeniero.idubigeo= new Ubigeo();
                        }
                    }
                )
                .catch(err => this.handleError(err));
        } else {
            return this.apiRequest.post('ingeniero', this.ingeniero)
                .then(
                    data => {
                        if(data && data.extraInfo){
                            this.cargando = false;
                            this.ingenieros.push(data.extraInfo);
                            this.vistaFormulario = false;
                            this.ingeniero =new Persona();
                        }
                        else{
                            this.toastr.info(data.operacionMensaje,"Informacion");
                            this.cargando = false;
                        }
                        if(this.ingeniero && !this.ingeniero.idubigeo){
                            this.ingeniero.idubigeo= new Ubigeo();
                        }
                    }
                )
                .catch(err => this.handleError(err));
        }
    };

    /*guardarIngenieros2(){
        this.cargando=true;
        if(this.ingeniero && this.ingeniero.idubigeo && !this.ingeniero.idubigeo.id){
            this.ingeniero.idubigeo= null;
        }
        this.api.post("ingeniero",this.ingeniero)
            .then(respuesta => {
                if(respuesta && respuesta.extraInfo){
                    this.ingeniero = respuesta.extraInfo;
                    this.toastr.success("Registro guardado exitosamente", 'Exito');
                    this.vistaFormulario = false;
                   // this.activeModal.close(this.ingeniero);
                    this.vistaFormulario = false;
                    this.cargando=false;
                } else {
                    this.cargando=false;
                    this.toastr.error(respuesta.operacionMensaje, 'Error');
                }
            })
            .catch(err => this.handleError(err));

    }*/

    confirmarEliminacion(ingeniero):void{
         const modalRef = this.modalService.open(ConfirmacionComponent);
         modalRef.result.then((result) => {
             this.eliminarIngeniero(ingeniero);
         }, (reason) => {
         });
    };

    eliminarIngeniero(ingeniero){
        this.cargando = true;
        return this.apiRequest.post('ingeniero/eliminar', {id:ingeniero.id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.ingenieros.splice(this.ingenieros.indexOf(ingeniero),1);
                    } else {
                        this.toastr.info(data.operacionMensaje,"Informacion");
                    }
                    this.cargando = false;
                }
            )
            .catch(err => this.handleError(err));
    };

    abrirModalUbigeo():void{
        const modalRef = this.modalService.open(ModalUbigeoComponent, {size: 'sm', keyboard: false});
        modalRef.result.then((result) => {
            this.ingeniero.idubigeo = result;
            console.log("Ha sido cerrado "+result);
        }, (reason) => {
            console.log("Ha sido cerrado "+reason);
        });
    };

    traerParaEdicion(id){
        this.cargando = true;
        this.vistaFormulario = true;
        return this.apiRequest.post('ingeniero/obtener', {id:id})
            .then(
                data => {
                    if(data && data.extraInfo){
                        this.cargando = false;
                        this.ingeniero = data.extraInfo;
                        if(this.ingeniero && !this.ingeniero.idubigeo){
                            this.ingeniero.idubigeo = new Ubigeo();
                        }
                    }
                    else{
                        this.toastr.info(data.operacionMensaje,"Informacion");
                        this.vistaFormulario = false;
                        this.cargando = false;
                    }
                }
            )
            .catch(err => this.handleError(err));
    };

  listarIngenieros(){
      this.cargando= true;
    this.api.post('ingeniero/pagina/'+this.page+'/cantidadPorPagina/'+this.paginacion.cantidadPorPagina, this.parametros)
        .then(data => {
            if(data){
                this.cargando = false;
                this.paginacion.totalRegistros = data.totalRegistros;
                this.paginacion.paginaActual = data.paginaActual;
                this.paginacion.totalPaginas = data.totalPaginas;
                this.ingenieros = data.registros;
            }
        })
        .catch(err => this.handleError(err));
  };

  private handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
      this.cargando = false;
  }

}
