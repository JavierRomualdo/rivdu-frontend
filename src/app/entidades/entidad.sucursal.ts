import { Empresa } from './entidad.empresa';
import { Ubigeo } from './entidad.ubigeo';

export class Sucursal {
  id: number;
  direccion: string;
  estado: boolean;
  nombre: string;
  ubigeo: Ubigeo;
  idempresa: Empresa;
}
