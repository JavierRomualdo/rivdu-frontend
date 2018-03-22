import { Compra } from "./entidad.compra";
import { Persona } from "./entidad.persona";
import { Relacion } from "./entidad.relacion";
import { Estadocliente } from './entidad.estadocliente';

export class Personacompra {
  id: number;
  idcompra: number;
  idpersona: Persona;
  idrelacion: Relacion;
  idestadocliente: Estadocliente;
  estado: boolean;
}
