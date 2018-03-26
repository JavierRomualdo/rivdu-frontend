import { Persona } from './entidad.persona';
import { Programas } from './entidad.programas';
import { Tipoprofresion } from './entidad.tipoprofesion';
import {Rol} from './entidad.rol';

export class Responsable {
  id: number;
  codigocip: number;
  estado: boolean;
  idpersona: Persona;
  idprograma: Programas;
  idrol: Rol;
}
