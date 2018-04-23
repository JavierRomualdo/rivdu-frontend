import { Persona } from "./entidad.persona";
import { Relacion } from "./entidad.relacion";

export class Personaventa {
    id: number;
    idventa: number;
    idpersona: Persona;
    idrelacion: Relacion;
    estado: boolean;
}