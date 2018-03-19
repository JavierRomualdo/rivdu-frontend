import { Ubigeo } from "./entidad.ubigeo";

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
}
