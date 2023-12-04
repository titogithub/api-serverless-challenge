import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export enum Pagination {
  DEFAULT_PAGE = 1,
  DEFAULT_SIZE = 10,
  MAX = 50,
}

export class PaginationDTO {
  @Expose()
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit: number;

  @Expose()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Max(Pagination.MAX)
  offset: number;
}
