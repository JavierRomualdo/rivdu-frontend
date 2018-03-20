import {Persona} from './entidad.persona';
import {Responsable} from './entidad.responsable';

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
}
