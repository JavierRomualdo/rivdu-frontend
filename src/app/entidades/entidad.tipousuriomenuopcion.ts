import { Menuopcion } from './entidad.menuopcion';
import { TipoUsuario } from './entidad.tipousuario';

export class TipoUsuariomenuopcion {
  id: number;
  acceso: number;
  barraherramienta: number;
  estado: number;
  idmenuopcion: Menuopcion;
  idtipousuario: TipoUsuario;
}
