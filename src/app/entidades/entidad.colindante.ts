import {Predio} from "./entidad.predio";

export class Colindante {
  id:number;
  idpredio: Predio;
  area: number;
  frente1: string;
  frente2: string;
  derecha1: string;
  derecha2: string;
  izquierda1: string;
  izquierda2: string;
  fondo1: string;
  fondo2: string;
  estado: boolean;
}
