import { Ubigeo } from "./entidad.ubigeo";
import {Estadocliente} from "./entidad.estadocliente";

export class Persona {
  id: number;
  apellido: string;
  correo: string;
  direccion: string;
  dni: string;
  estado: number;
  idubigeo: Ubigeo;
  nombre: string;
  telefono: string;
  personarolList: any = {};
  idestado : Estadocliente;
}
