export type TPagination = {
  limit: number;
  offset: number;
};

export type TSearchResponse<T> = {
  results: Array<T>;
  totalCount: number;
};
