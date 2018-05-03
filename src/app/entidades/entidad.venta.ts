import { Predio } from './entidad.predio';
import { Programas } from './entidad.programas';
import { Usuario } from './entidad.usuario';

export class Venta {
    id: number;
    fecha: Date;
    estado: boolean;
    usuariocrea: string;
    usuarioeditaa: string;
    correlativo: number;
    serie: string;
    copialiteral: boolean;
    idpredio: Predio;
    idprograma: Programas;
    idusuario: Usuario;
}
