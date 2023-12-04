import { Expose, plainToInstance } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  validateOrReject,
} from 'class-validator';

export const validate = async (
  request: unknown,
): Promise<CreateEmpleadoDTO> => {
  const parsedBody = plainToInstance(CreateEmpleadoDTO, request, {
    excludeExtraneousValues: true,
  });

  await validateOrReject(parsedBody, {
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    skipMissingProperties: false,
  });

  return parsedBody;
};

export class CreateEmpleadoDTO {
  @Expose()
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsPositive()
  @IsDefined()
  dni: number;

  @Expose()
  @IsString()
  @MaxLength(30)
  nombre: string;

  @Expose()
  @IsString()
  @MaxLength(30)
  cargo: string;

  @Expose()
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsPositive()
  @Max(200)
  edad: number;
}
