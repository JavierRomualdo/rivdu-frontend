import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {ApiRequestService} from "../../servicios/api-request.service";
import {DownloadService} from "../../servicios/download.service";
import {AuthService} from "../../servicios/auth.service";
import {Savecompradto} from "../../entidades/entidad.savecompradto";
import {ToastrService} from 'ngx-toastr';
import {TreeNode,MenuItem} from 'primeng/api';
import { Paginacion } from '../../entidades/entidad.paginacion';
import {UploadComponent} from '../upload/upload.component';

@Component({
  selector: 'app-expedientes-compras',
  templateUrl: './expedientes-compras.component.html',
  styleUrls: ['./expedientes-compras.component.css']
})
export class ExpedientesComprasComponent implements OnInit {

  @ViewChild("download") download;
  public cargando:boolean =false;
  public listacompra:any=[];
  files1: TreeNode[];
  selectedFile2: TreeNode;
  items:any[];
  cols:any[];
  page:number=1;
  clientenombre:string;
  clientedoc:string;
  correlativo:string;
  paginacion: Paginacion;
  parametros={};

  constructor(
    private api: ApiRequestService,
    private down: DownloadService,
    private auth: AuthService,
    private modal:NgbModal,
    private toastr: ToastrService
  ) {
    this.paginacion = new Paginacion();
  }

  ngOnInit() {
    this.listarcompras();
    this.items = [
      {label: 'Ver/Descargar', icon: 'fa-eye', command: (event) => this.viewNode(this.selectedFile2)},
      {label: 'Eliminar', icon: 'fa-trash', command: (event) => this.deleteNode(this.selectedFile2)},
      {label: 'Subir', icon: 'fa-upload', command: (event) => this.uploadNode(this.selectedFile2)}
    ];
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'persona', header: 'Nombre' },
      { field: 'fecharegistro', header: 'Fecha Alta' },
      { field: 'fechacompra', header: 'Fecha Transferencia' }
    ];
  }

  busqueda():void{
    this.page = 1;
    this.parametros ={
      "clientenombre":this.clientenombre,
      "clientodoc":this.clientedoc,
      "correlativo":this.correlativo
    };
    this.listarcompras();
  };

  viewNode(node: any) {
      this.cargando = true;
      this.down.get("expediente/descargar/"+node.id)
        .then(
          data => {
            if(data){
              var fileName = node.label;
              var file = new Blob([data._body],{type: node.contenttype });
              var url = URL.createObjectURL(file);
              this.download.nativeElement.href = url;
              this.download.nativeElement.download = fileName;
              this.download.nativeElement.click();
            }
          }
        )
        .catch(err => this.handleError(err));
  }

  deleteNode(node: TreeNode) {
    node.parent.children = node.parent.children.filter( n => n.data !== node.data);
    this.toastr.info(node.data.name);
  }

  uploadNode(node: any) {
    const modalRef = this.modal.open(UploadComponent, {windowClass:'modal-open', size: 'lg', keyboard: false});
    if(node && !node.idcompra){
      node = node.parent;
    }
    modalRef.componentInstance.idtipoexpediente = node.id;
    modalRef.componentInstance.idoperacion = node.idcompra;
    modalRef.componentInstance.titulo = node.label;
    modalRef.result.then((result) => {
      let rowData = this.listacompra.find(item => item.id = node.idcompra);
      this.obtenerDocumentos(rowData);
      this.auth.agregarmodalopenclass();
    }, (reason) => {
      let rowData = this.listacompra.find(item => item.id = node.idcompra);
      this.obtenerDocumentos(rowData);
      this.auth.agregarmodalopenclass();
    });
  }

  listarcompras(){
    this.cargando = true;
    this.api.post('compra/pagina/'+this.page+'/cantidadPorPagina/'+this.paginacion.cantidadPorPagina, this.parametros)
      .then(data => {
        if(data){
          this.paginacion.totalRegistros = data.totalRegistros;
          this.paginacion.paginaActual = data.paginaActual;
          this.paginacion.totalPaginas = data.totalPaginas;
          this.listacompra = data.registros;
          this.cargando = false;
        }
      })
      .catch(err => this.handleError(err));
  };

  obtenerDocumentos(rowData){
    this.cargando = true;
    this.api.get('compra/expedienteslist/'+rowData.id)
      .then(data => {
        if(data && data.extraInfo){
          rowData.files1 = data.extraInfo;
        }
        this.cargando = false;
      })
      .catch(err => this.handleError(err));
  };

  handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
    this.cargando =false;
  }

}
