// jest.mock('../../../../infrastructure/ORMConnection');
jest.mock('../../../../services/env.service');

import { DataSource } from 'typeorm';

import { validBodyRequest } from './request.spec';

import { ErrorResponseDTO } from '../../../../dtos/response/error-response.dto';
import { EmpleadoConstraints } from '../../../../infrastructure/entities';
import { ORMConnection } from '../../../../infrastructure/ORMConnection';
import { EnvService } from '../../../../services/env.service';
import { ErrorResponses, create } from '../process';

describe('validate create empleado work flow', () => {
  it('should throw an error when there is an existing empleado with the same DNI', async () => {
    const error = {
      driverError: {
        constraint: EmpleadoConstraints.PK_f9e0bab727c79997a14feaa2f85,
      },
    };

    const mockedRejectInsertEmpleado = jest.fn().mockRejectedValueOnce(error);

    jest.spyOn(ORMConnection, 'getInstance').mockImplementation(
      () =>
        ({
          getConn: jest.fn().mockImplementationOnce(
            () =>
              Promise.resolve({
                getRepository: jest.fn().mockImplementationOnce(() => ({
                  insert: mockedRejectInsertEmpleado,
                })),
              }) as unknown as DataSource,
          ),
        } as unknown as ORMConnection),
    );

    try {
      await create({
        ormConnection: ORMConnection.getInstance(EnvService.getInstance()),
      })(validBodyRequest);
      expect(false).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(ErrorResponseDTO);
      expect(error.message).toBe(ErrorResponses.EXISTING_EMPLEADO);
    }
  });

  it('should not throw an error when there is no existing empleado', async () => {
    jest.spyOn(ORMConnection, 'getInstance').mockImplementation(
      () =>
        ({
          getConn: jest.fn().mockImplementationOnce(
            () =>
              Promise.resolve({
                getRepository: jest.fn().mockImplementationOnce(() => ({
                  insert: jest.fn().mockResolvedValue(validBodyRequest),
                })),
              }) as unknown as DataSource,
          ),
        } as unknown as ORMConnection),
    );

    try {
      const createdEmpleado = await create({
        ormConnection: ORMConnection.getInstance(EnvService.getInstance()),
      })(validBodyRequest);
      expect(createdEmpleado).toMatchObject(validBodyRequest);
    } catch (error) {
      expect(false).toBeTruthy();
    }
  });
});
