import { Compra } from "./entidad.compra";
import { Persona } from './entidad.persona';

export class Captador {
  id: number;
  idcompra: Compra;
  idpersona: Persona;
  comision: number;
  estado: boolean;
}
