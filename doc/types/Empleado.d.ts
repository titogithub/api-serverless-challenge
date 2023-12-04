import { TPagination } from './Search.d';

export type TCreateEmpleado = {
  dni: number;
  edad: number;
  nombre: string;
  cargo: string;
};

export type TGetEmpleados = Array<TCreateEmpleado>;

export type TSearchEmpleado = {
  dni?: number;
  edad?: number;
  nombre?: string;
  cargo?: string;
  pagination?: TPagination;
};
