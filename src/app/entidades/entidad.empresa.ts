import {Ubigeo} from "./entidad.ubigeo";
import {Persona} from "./entidad.persona";

export class Empresa {
  id:number;
  email:string;
  estado:boolean;
  avcajiron:string;
  lote:string;
  manzana:string;
  numeropartida:string;
  razonsocial:string;
  ruc:string;
  urbanizacion:string;
  idubigeo:Ubigeo;
  idgerente: Persona;
}
