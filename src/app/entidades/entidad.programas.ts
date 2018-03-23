import {Persona} from './entidad.persona';
import {Responsable} from './entidad.responsable';
import {Especificaciones} from './entidad.especificaciones';

export class Programas {
  id: number;
  codigoet: string;
  correlativocontrato1: string;
  correlativocontrato2: string;
  estado: boolean;
  importe: number;
  maximovalor: number;
  nombre: string;
  responsableList:Responsable[];
    programaespecificacionesList:Especificaciones[];
}
