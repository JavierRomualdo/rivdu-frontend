import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {ApiRequestService} from "../../servicios/api-request.service";
import {Savecompradto} from "../../entidades/entidad.savecompradto";
import {ToastrService} from 'ngx-toastr';
import {NodeService} from '../../servicios/node.service';
import {TreeNode,MenuItem} from 'primeng/api';

@Component({
  selector: 'app-expedientes-proyectos',
  templateUrl: './expedientes-proyectos.component.html',
  styleUrls: ['./expedientes-proyectos.component.css']
})
export class ExpedientesProyectosComponent implements OnInit {

  public cargando:boolean =false;
  public listacompra:Savecompradto[]=[];
  files1: TreeNode[];

  constructor(
    private modalService: NgbModal,
    private api: ApiRequestService,
    private modal:NgbModal,
    private toastr: ToastrService,
    private nodeService: NodeService
  ) {
  }

  ngOnInit() {
    this.listarcompras();
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
    //this.nodeService.getFilesystem().then(files => this.files1 = files);
  }

  listarcompras(){
    this.cargando = true;
    this.api.get("compra/listar")
      .then(respuesta => {
        if(respuesta && respuesta.extraInfo){
          this.listacompra = respuesta.extraInfo;
          this.cargando =false;
        } else {
          this.toastr.error(respuesta.operacionMensaje, 'Error');
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
