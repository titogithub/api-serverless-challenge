import { StatusCodes } from 'http-status-codes';

import { CreateEmpleadoDTO } from './request';

import { ErrorResponseDTO } from '../../../dtos/response/error-response.dto';
import {
  Empleado,
  EmpleadoConstraints,
} from '../../../infrastructure/entities';
import { ORMConnection } from '../../../infrastructure/ORMConnection';

type TDependencies = {
  ormConnection: ORMConnection;
};

export enum ErrorResponses {
  EXISTING_EMPLEADO = 'Ya existe un empleado con el DNI proporcionado',
}

export const create =
  (dependencies: TDependencies) =>
  async (newEmpleadoDTO: CreateEmpleadoDTO): Promise<CreateEmpleadoDTO> => {
    const { ormConnection } = dependencies;
    const conn = await ormConnection.getConn();
    const addressRepo = conn.getRepository(Empleado);

    await addressRepo.insert(newEmpleadoDTO).catch((error) => {
      if (
        error?.driverError?.constraint ===
        EmpleadoConstraints.PK_f9e0bab727c79997a14feaa2f85
      ) {
        throw new ErrorResponseDTO(
          ErrorResponses.EXISTING_EMPLEADO,
          StatusCodes.BAD_REQUEST,
        );
      }
    });

    return {
      ...newEmpleadoDTO,
    };
  };
