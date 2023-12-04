export interface IResponse<T> {
  data: T;
}

export class ResponseDTO<T> implements IResponse<T> {
  data: T;
  constructor(data: T) {
    this.data = data;
  }
}
