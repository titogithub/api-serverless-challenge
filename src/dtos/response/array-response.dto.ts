export interface IResponseArray<T> {
  results: T[];
  totalCount?: number;
  page?: number;
}

export class ArrayResponseDTO<T> implements IResponseArray<T> {
  results: T[];
  totalCount?: number;
  page?: number;

  constructor(results: T[], page: number, totalCount?: number) {
    this.results = results;
    this.totalCount = totalCount ?? results?.length ?? 0;
    this.page = page;
  }
}
