import {Ubigeo} from "./entidad.ubigeo";
import {Compra} from "./entidad.compra";

export class Predio {
  id:number;
  partida: string;
  idubigeo: Ubigeo;
  ubicacion: string;
  mz: string;
  lote: string;
  sublote: string;
  frente: string;
  codigosnip: string;
  estado: boolean;
}
