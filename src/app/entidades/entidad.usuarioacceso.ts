import { TipoUsuario } from './entidad.tipousuario';
import { Usuario } from './entidad.usuario';

export class Usuarioacceso {
  id: number;
  estado: boolean;
  idtipousuario: TipoUsuario;
  idusuario: Usuario;
}
