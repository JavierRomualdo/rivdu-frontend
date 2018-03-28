import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {ApiRequestService} from "../../servicios/api-request.service";
import {Savecompradto} from "../../entidades/entidad.savecompradto";
import {ToastrService} from 'ngx-toastr';
import {NodeService} from '../../servicios/node.service';
import {TreeNode,MenuItem} from 'primeng/api';
import { Paginacion } from '../../entidades/entidad.paginacion';

@Component({
  selector: 'app-expedientes-compras',
  templateUrl: './expedientes-compras.component.html',
  styleUrls: ['./expedientes-compras.component.css']
})
export class ExpedientesComprasComponent implements OnInit {

  public cargando:boolean =false;
  public listacompra:Savecompradto[]=[];
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
    private modalService: NgbModal,
    private api: ApiRequestService,
    private modal:NgbModal,
    private toastr: ToastrService,
    private nodeService: NodeService
  ) {
    this.paginacion = new Paginacion();
  }

  ngOnInit() {
    this.listarcompras();
    this.items = [
      {label: 'View', icon: 'fa-search', command: (event) => this.viewNode(this.selectedFile2)},
      {label: 'Delete', icon: 'fa-close', command: (event) => this.deleteNode(this.selectedFile2)}
    ];
    this.files1 =
      [
        {
          "label": "Documents",
          "data": "Documents Folder",
          "expandedIcon": "fa-folder-open",
          "collapsedIcon": "fa-folder",
          "children": [{
            "label": "Work",
            "data": "Work Folder",
            "expandedIcon": "fa-folder-open",
            "collapsedIcon": "fa-folder",
            "children": [{"label": "Expenses.doc", "icon": "fa-file-word-o", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "fa-file-word-o", "data": "Resume Document"}]
          },
            {
              "label": "Home",
              "data": "Home Folder",
              "expandedIcon": "fa-folder-open",
              "collapsedIcon": "fa-folder",
              "children": [{"label": "Invoices.txt", "icon": "fa-file-word-o", "data": "Invoices for this month"}]
            }]
        },
        {
          "label": "Pictures",
          "data": "Pictures Folder",
          "expandedIcon": "fa-folder-open",
          "collapsedIcon": "fa-folder",
          "children": [
            {"label": "barcelona.jpg", "icon": "fa-file-image-o", "data": "Barcelona Photo"},
            {"label": "logo.jpg", "icon": "fa-file-image-o", "data": "PrimeFaces Logo"},
            {"label": "primeui.png", "icon": "fa-file-image-o", "data": "PrimeUI Logo"}]
        },
        {
          "label": "Movies",
          "data": "Movies Folder",
          "expandedIcon": "fa-folder-open",
          "collapsedIcon": "fa-folder",
          "children": [{
            "label": "Al Pacino",
            "data": "Pacino Movies",
            "children": [{"label": "Scarface", "icon": "fa-file-video-o", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "fa-file-video-o", "data": "Serpico Movie"}]
          },
            {
              "label": "Robert De Niro",
              "data": "De Niro Movies",
              "children": [{"label": "Goodfellas", "icon": "fa-file-video-o", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "fa-file-video-o", "data": "Untouchables Movie"}]
            }]
        }
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

  viewNode(node: TreeNode) {
    this.toastr.info(node.data.name);
  }

  deleteNode(node: TreeNode) {
    node.parent.children = node.parent.children.filter( n => n.data !== node.data);
    this.toastr.info(node.data.name);
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
    this.cargando = false;
  };

  handleError(error: any): void {
    this.toastr.error("Error Interno", 'Error');
    this.cargando =false;
  }

}
