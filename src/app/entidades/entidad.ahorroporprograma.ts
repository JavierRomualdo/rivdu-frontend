import { Programas } from './entidad.programas';
import { Ubigeo } from './entidad.ubigeo';

export class Ahorroporprograma {
  id: number;
  ahorro: number;
  estado: boolean;
  idprograma: Programas;
  idubigeo: Ubigeo;
}
