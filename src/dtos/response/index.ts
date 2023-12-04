import { ArrayResponseDTO } from './array-response.dto';
import { ResponseDTO } from './response.dto';

export type ObjectOrArray<
  T,
  R extends ArrayResponseDTO<T> | ResponseDTO<T>,
> = R extends ArrayResponseDTO<T> ? ArrayResponseDTO<T> : ResponseDTO<T>;
