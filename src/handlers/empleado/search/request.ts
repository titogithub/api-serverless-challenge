import { Expose, Type, plainToInstance } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  ValidateNested,
  validateOrReject,
} from 'class-validator';

import { Pagination, PaginationDTO } from '../../../dtos/pagination';

export const validate = async (
  request: unknown,
): Promise<SearchEmpleadoDTO> => {
  const parsedBody = plainToInstance(SearchEmpleadoDTO, request, {
    excludeExtraneousValues: true,
    exposeUnsetFields: false,
  });

  await validateOrReject(parsedBody, {
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    skipMissingProperties: false,
  });

  if (!parsedBody.pagination) {
    parsedBody.pagination = { limit: Pagination.DEFAULT_SIZE, offset: 0 };
  }

  return parsedBody;
};

export class SearchEmpleadoDTO {
  @Expose()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  nombre: string;

  @Expose()
  @IsString()
  @IsOptional()
  @MaxLength(30)
  cargo: string;

  @Expose()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsPositive()
  dni: number;

  @Expose()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsPositive()
  @Max(200)
  edad: number;

  @Expose()
  @ValidateNested()
  @IsOptional()
  @Type(() => PaginationDTO)
  @ValidateNested({ each: true })
  pagination: PaginationDTO;
}
