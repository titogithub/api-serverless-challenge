export interface IErrorResponse<T = unknown> {
  message: string;
  reasons?: Array<T> | T;
  statusCode: number;
}

export class ErrorResponseDTO<T = unknown> implements IErrorResponse<T> {
  message: string;
  reasons?: T[] | T;
  statusCode: number;
  constructor(message: string, statusCode: number, reasons?: T[] | T) {
    this.message = message;
    this.statusCode = statusCode;
    this.reasons = reasons;
  }
}
