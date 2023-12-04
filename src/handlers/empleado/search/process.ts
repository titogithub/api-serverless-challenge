/* eslint-disable no-fallthrough */
import { Brackets } from 'typeorm';

import { SearchEmpleadoDTO } from './request';

import { calculatePage } from '../../../common/pagination';
import { ArrayResponseDTO } from '../../../dtos/response/array-response.dto';
import { Empleado } from '../../../infrastructure/entities';
import { ORMConnection } from '../../../infrastructure/ORMConnection';

type TDependencies = {
  ormConnection: ORMConnection;
};

export enum ErrorResponses {
  NOT_FOUND = 'Not found',
}

export const searchEmpleado =
  (dependencies: TDependencies) =>
  async (
    searchEmpleadoDTO: SearchEmpleadoDTO,
  ): Promise<ArrayResponseDTO<Empleado>> | null => {
    const { ormConnection } = dependencies;

    const conn = await ormConnection.getConn();
    const searchQuery = conn
      .getRepository(Empleado)
      .createQueryBuilder('Empleado');

    searchQuery.andWhere(
      new Brackets((qb) => {
        Object.keys(searchEmpleadoDTO).forEach((key) => {
          switch (key) {
            case 'nombre':
              qb.orWhere('"Empleado"."nombre" ILIKE :nombre', {
                nombre: searchEmpleadoDTO.nombre,
              });
              break;
            case 'cargo':
              qb.orWhere('"Empleado"."cargo" ILIKE :cargo', {
                cargo: searchEmpleadoDTO.cargo,
              });
              break;
            case 'dni':
              qb.orWhere('Empleado.dni = :dni', { dni: searchEmpleadoDTO.dni });
              break;
            case 'edad':
              qb.orWhere('Empleado.edad = :edad', {
                edad: searchEmpleadoDTO.edad,
              });
              break;
            default:
              break;
          }
        });
      }),
    );

    const { limit, offset } = searchEmpleadoDTO.pagination;
    searchQuery.limit(limit).offset(offset);

    const [results, totalCount] = await searchQuery.getManyAndCount();

    const response = new ArrayResponseDTO(
      results,
      calculatePage(offset, limit),
      totalCount,
    );

    return response;
  };
