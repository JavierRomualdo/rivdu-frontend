import { Estructura } from './entidad.estructura';
import { Programas } from './entidad.programas';
export class Especificaciones {
  id: number;
  especificaciones: string;
  estado: boolean;
  categoria: string;
  etapa: string;
  valorm2: number;
  idestructura: Estructura;
  idprograma: Programas;
}
