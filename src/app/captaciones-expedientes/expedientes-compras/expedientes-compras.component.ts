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
    this.files1 = [
      {
        "data":{
          "name":"Documents",
          "size":"75kb",
          "type":"Folder"
        },
        "children":[
          {
            "data":{
              "name":"Work",
              "size":"55kb",
              "type":"Folder"
            },
            "children":[
              {
                "data":{
                  "name":"Expenses.doc",
                  "size":"30kb",
                  "type":"Document"
                }
              },
              {
                "data":{
                  "name":"Resume.doc",
                  "size":"25kb",
                  "type":"Resume"
                }
              }
            ]
          },
          {
            "data":{
              "name":"Home",
              "size":"20kb",
              "type":"Folder"
            },
            "children":[
              {
                "data":{
                  "name":"Invoices",
                  "size":"20kb",
                  "type":"Text"
                }
              }
            ]
          }
        ]
      },
      {
        "data":{
          "name":"Pictures",
          "size":"150kb",
          "type":"Folder"
        },
        "children":[
          {
            "data":{
              "name":"barcelona.jpg",
              "size":"90kb",
              "type":"Picture"
            }
          },
          {
            "data":{
              "name":"primeui.png",
              "size":"30kb",
              "type":"Picture"
            }
          },
          {
            "data":{
              "name":"optimus.jpg",
              "size":"30kb",
              "type":"Picture"
            }
          }
        ]
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
