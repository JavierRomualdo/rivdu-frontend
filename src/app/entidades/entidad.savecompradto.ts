import { Personacompra } from './entidad.personacompra';
import { Colindante } from './entidad.colindante';
import { Compra } from "./entidad.compra";
import { Predio } from "./entidad.predio";
import { Servicio } from './entidad.servicio';
import { Captador } from './entidad.captador';

export class Savecompradto{
    compra: Compra;
    predio: Predio;
    colindante: Colindante;
    servicios: Servicio [];
    captador: Captador;
    personacompra: Personacompra [];
    personacompra2: Personacompra [];
}
