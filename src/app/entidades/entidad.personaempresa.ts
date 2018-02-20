import { Empresa } from './entidad.empresa';
import { Persona } from './entidad.persona';
export class Personaempresa {
  id: number;
  estado: boolean;
  idempresa: Empresa;
  idpersona: Persona;
}
